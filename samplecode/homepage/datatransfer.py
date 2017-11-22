import pdb
import psycopg2
from psycopg2.extras import DictCursor
from MakePurchase.models import *
from Management.models import *
from django.contrib.auth.models import User
from psycopg2 import extensions
from Status import xlsxtopdf
from datetime import datetime
from django.utils.timezone import is_naive, make_aware
# from chem_auth.models import ChemUser


class DataTransfer:
    conn = None
    cur = None
    TEST = True
    CUT_OFF_DATE = datetime(2017, 1, 31)

    def __init__(self):
        self.connect()
        # if is_naive(self.CUT_OFF_DATE):
        #     self.CUT_OFF_DATE = make_aware(self.CUT_OFF_DATE,
        #                                    timezone=None,
        #                                    is_dst=True)

    def connect(self):

        DB = 'purchaserequisition'
        USER = 'pruser'
        HOST = 'sql.chem.byu.edu'
        PORT = '5432'
        PW = ''
        print("IN CONNECT")
        dsn = "dbname={}, user={}, password={}, host={}, port={}".format(
                            DB, USER, PW, HOST, PORT)
        try:
            self.conn = psycopg2.connect(dbname=DB, user=USER, password=PW,
                                         host=HOST, port=PORT)
            self.cur = self.conn.cursor(cursor_factory=DictCursor)
            self.conn.set_client_encoding('UTF8')

        except Exception():
            print "Failed to connect to {}".format(DB)

    def run(self):
        print "RUNNING "
        self.transferManagement()
        self.cleanFKs()
        # self.transferPurchases()
        self.transferItems()
        self.transferPayments()

    def run_test(self):
        print("RUNNING TEST")
        # pdb.set_trace()

        # try:
        #     self.cur.execute("""SELECT * from speedtype""")
        # except Exception():
        #     print("I can't SELECT from ")
        # # co = self.cur.fetchmany(100)
        # rows = self.cur.fetchall()
        # for row in rows:
        #     print(row['speedtype'])
        # print(co)
        # print "\nShow me the databases:\n"
        # for row in rows:
        #     print "\n   {}".format(row['name'][1])

    def make_excel(self, companies):
        print("MAKING EXCEL")
        filepath = "homepage/templates/company_records_busoff.xlsx"
        wb = xlsxtopdf.open_workbook(filepath)
        if wb is None:
            print("wb is none?")
            return None
        else:
            ws = wb.active
        i = 2
        for c in companies:
            ws['A{}'.format(i)] = c['name']
            ws['B{}'.format(i)] = c['address1']
            ws['C{}'.format(i)] = c['address2']
            ws['D{}'.format(i)] = c['city']
            ws['E{}'.format(i)] = c['state']
            ws['F{}'.format(i)] = c['web']
            ws['G{}'.format(i)] = c['contact']
            ws['H{}'.format(i)] = c['email']
            ws['I{}'.format(i)] = c['fax']
            ws['J{}'.format(i)] = c['phone']
            ws['K{}'.format(i)] = c['zip']
            ws['L{}'.format(i)] = c['companyid']
            i = i+1
        wb.save(filepath)

    def unOrdered(self, p):
        nopo = False
        nopr = False
        if p['prnumber'] == 0 or p['prnumber'] is None:
            nopr = True
        if p['ponumber'] == 0 or p['ponumber'] is None:
            nopo = True
        if (nopo and nopr):
            return True
        return False

    def transferPurchases(self):
        if not self.TEST:
            self.transferDeliveryLocations()
            self.transferCompanies()
        # TODO: transfer pr over to MakePurchase_purchase
        print("In purchases")
        elim = 0
        try:
            self.cur.execute("""SELECT * from pr""")
        except Exception():
            print("I can't SELECT from pr")
        purchases = self.cur.fetchall()
        # p = purchases[0]
        # print("LAST MOD: {}".format(p['last_modified']))
        # print("CUT OFF: {}".format(self.CUT_OFF_DATE))

        # if not self.TEST:
        for p in purchases:
            # print("LAST MOD: {}".format(p['last_modified']))
            # print("CUT OFF: {}".format(self.CUT_OFF_DATE))
            # print("PR: {} PO: {}".format(p['prnumber'], p['ponumber']))
            if ((self.CUT_OFF_DATE > p['last_modified']) and self.unOrdered(p)):
                # print("JUNK with pk={}".format(p['prid']))
                # print("LAST MOD: {}".format(p['last_modified']))
                # print("CUT OFF: {}".format(self.CUT_OFF_DATE))
                var = Purchase.objects.filter(pk=p['prid'])
                if var:
                    var.delete()
                elim += 1
                continue
            elif (self.CUT_OFF_DATE < p['last_modified']):
                uid = p['prid']
                if Purchase.objects.filter(pk=uid).exists():
                    var = Purchase.objects.get(pk=uid)
                    if self.TEST:
                        continue
                else:
                    var = Purchase(pk=uid)
                if (not Company.objects.filter(pk=p['companyid']).exists()
                   or not DeliveryLocation.objects.filter(pk=p['deliveryid'])
                   .exists()):
                    # print("NO CO or LOC with pk={}".format(p['prid']))
                    var = Purchase.objects.filter(pk=p['prid'])
                    if var:
                        var.delete()
                    elim += 1
                    continue
                info = self.getBasic(p)
                order = self.getOrder(p)
                transaction = self.getTransaction(p)
                user = self.getUser(p['username'])
                var.last_mod = p['last_modified']
                var.requested_at = p['requestdate']
                var.total = p['total_cost']
                var.basic_info = info
                var.order_status = order
                var.transaction = transaction
                var.user = user
                var.save()
                self.makeFeeModel(p)
        print("ELIMINATED: {}".format(elim))

    def makeFeeModel(self, pr):
        prid = pr['prid']
        if (Fee.objects.filter(purchase_id=prid)):
            var = Fee.objects.get(purchase_id=prid)
        else:
            var = Fee(purchase_id=prid)
        var.hazardous = pr['hazmat_fees']
        var.handling = pr['shipping_fees']
        var.save()

    def cleanFKs(self):
        print("******************************\nBASIC INFO")
        if not self.TEST:
            for b in BasicInfo.objects.all():
                if (Purchase.objects.filter(basic_info=b.pk).exists()):
                    pass
                else:
                    b.delete()
        print("******************************\nCLEANING ORDERSTATUS")
        if not self.TEST:
            for o in OrderStatus.objects.all():
                if (Purchase.objects.filter(order_status_id=o.pk).exists()):
                    pass
                else:
                    o.delete()
        print("******************************\nCLEANING TRANSACTIONS")
        if not self.TEST:
            for t in Transaction.objects.filter():
                if (Purchase.objects.filter(transaction_id=t.pk).exists()):
                    pass
                else:
                    t.delete()

    def getBasic(self, p):
        company = Company.objects.get(pk=p['companyid'])
        loc = DeliveryLocation.objects.get(pk=p['deliveryid'])
        name = p['title']
        if not name:
            name = "No Description Available"
        uid = p['prid']
        try:
            var = Purchase.objects.get(pk=uid)
            info = var.basic_info
        except Exception():
            info = BasicInfo()
        info.name_of_purchase = name,
        info.extra_info = p['shipping_instructions']
        info.date_required = p['daterequired']
        info.shipping_method = p['shipping_method']
        info.contact_name = p['contact']
        info.contact_email = p['contact_email']
        info.contact_phone = p['contact_phone']
        info.company = company
        info.deliver_to = loc
        info.save()
        return info

    def getTransaction(self, p):
        uid = p['prid']
        try:
            var = Purchase.objects.get(pk=uid)
            tr = var.transaction
        except Exception():
            tr = Transaction()
        tr.pr_date = p['prdate']
        tr.pr_number = p['prnumber']
        tr.po_date = p['podate']
        tr.po_number = p['ponumber']
        tr.save()
        return tr

    def getOrder(self, p):
        uid = p['prid']
        try:
            var = Purchase.objects.get(pk=uid)
            order = var.order_status
        except Exception():
            order = OrderStatus()
        order.status = p['status'].upper()
        order.submit_date = p['requestdate']
        order.verified_date = p['verified']
        order.ordered_date = p['ordered']
        order.received_date = p['received']
        order.sent_to_campus_date = p['sent_to_purchasing']
        order.save()
        return order
    # def makeOrderStatusModel(self, pr):
    #     prid = pr['prid']
    #     if (OrderStatus.objects.filter(purchase_id=prid)):
    #         var = OrderStatus.objects.get(purchase_id=prid)
    #     else:
    #         var = OrderStatus(purchase_id=prid)
    #     var.status = pr['status'].upper()
    #     var.submit_date = pr['requestdate']
    #     var.verified_date = pr['verified']
    #     var.ordered_date = pr['ordered']
    #     var.reveived_date = pr['received']
    #     var.sent_to_campus_date = pr['sent_to_purchasing']
    #     var.save()
    #
    # def makeTransactionModel(self, pr):
    #     prid = pr['prid']
    #     if (Transaction.objects.filter(purchase_id=prid)):
    #         var = Transaction.objects.get(purchase_id=prid)
    #     else:
    #         var = Transaction(purchase_id=prid)
    #     var.pr_date = pr['prdate']
    #     var.pr_number = pr['prnumber']
    #     var.po_date = pr['podate']
    #     var.po_number = pr['ponumber']
    #     var.save()

    def transferCompanies(self):

        print("In companies")
        try:
            self.cur.execute("""SELECT * from company""")
        except Exception():
            print("I can't SELECT from company")

        companies = self.cur.fetchall()
        for c in companies:
            uid = c['companyid']
            if Company.objects.filter(pk=uid).exists():
                var = Company.objects.get(pk=uid)
            else:
                var = Company(pk=uid)
            var.name = c['name']
            var.address1 = c['address1']
            var.address2 = c['address2']
            var.city = c['city']
            var.state = c['state']
            var.zipcode = c['zip']
            var.website = c['web']
            var.fax = c['fax']
            var.phone = c['phone']
            var.save()

    def transferDeliveryLocations(self):
        print("In locations")
        try:
            self.cur.execute("""SELECT * from delivery""")
        except Exception():
            print("I can't SELECT from delivery")
        locations = self.cur.fetchall()
        for l in locations:
            uid = l['deliveryid']
            user = self.getUser(l['username'])
            first_name = user.first_name
            last_name = user.last_name
            if DeliveryLocation.objects.filter(pk=uid).exists():
                var = DeliveryLocation.objects.get(pk=uid)
            else:
                var = DeliveryLocation(pk=uid)
            var.first_name = first_name
            var.last_name = last_name
            var.room = l['room']
            var.building = l['building']
            var.email = l['confirmemail']
            var.phone = l['phone']
            var.save()

    def transferPayments(self, id):
        """
        When given a purchase_id (the id of the pr) finds
        all payments related in the payment table and transfers those
        over to the MakePurchase_payment. (Make sure prid of payment match
        the new purchase models id)
        """
        # TODO: transfer pr over to MakePurchase_purchase
        print("In payments")
        try:
            self.cur.execute("""SELECT * from payment""")
        except Exception():
            print("I can't SELECT from payment")
        payments = self.cur.fetchall()
        # Map: old_db.payments -> new_db.payment
        # id -> id
        # amount -> amount
        # null -> parent (numeric)
        # if !approved "Awaiting Approval" else "Approved" -> status (String)
        # getUserBy(username) -> approval_person (django user)
        # account -> account (foreign key to account)
        # account_preset -> payment_method (foreign key to account preset)
        # prid  -> purchase
        return

    def transferItems(self):

        print("In items")
        try:
            self.cur.execute("""SELECT * from item""")
        except Exception():
            print("I can't SELECT from item")
        items = self.cur.fetchall()
        for i in items:
            if (Purchase.objects.filter(pk=i['prid']).exists()):
                uid = i["itemid"]
                if (Item.objects.filter(pk=uid).exists()):
                    if self.TEST:
                        continue
                    var = Item.objects.get(pk=uid)
                else:
                    print("UID: {}".format(uid))
                    var = Item(pk=uid)
                var.quantity = 0 if i['quantity'] is None else i['quantity']
                var.catalog = 'NA' if i['catalogno'] is None else i['catalogno']
                var.is_chemical = True if i['hazmat'] is 1 else False
                var.unit_cost = 0 if i['unitcost'] is None else i['unitcost']
                var.storage = 'NA' if i['storageloc'] is None else i['storageloc']
                var.description = 'NA' if i['description'] is None else i['description']
                var.unit = 'EACH' if i['unitsize'] is None else i['unitsize']
                var.date_received = i['received']
                var.quantity_received = i['quantity_received']
                var.purchase = Purchase.objects.get(pk=i['prid'])
                var.save()

    def transferManagement(self):
        if not self.TEST:
            print "in transferManagement"
            self.transferSpeedTypes()
            self.transferSubclasses()
            self.transferPresets()
            self.transferAccountCategories()
            print "DONE"
        # transferPresetPermission
        # transferNonChemPresets

    def transferSpeedTypes(self):
        TEST = False
        try:
            self.cur.execute("""SELECT * from speedtype""")
        except Exception():
            print("I can't SELECT from speedtype")
        speedtypes = self.cur.fetchall()
        if not TEST:
            for st in speedtypes:
                uid = st['id']
                title = st['description']
                value = st['speedtype']
                if Speedtype.objects.filter(pk=uid).exists():
                    var = Speedtype.objects.get(pk=uid)
                    var.number = value
                    var.speedtype_title = title
                    var.save()
                else:
                    newVar = Speedtype(pk=uid, speedtype_title=title,
                                       number=value)
                    newVar.save()

    def transferSubclasses(self):
        TEST = False
        print("IN subclasses")
        try:
            self.cur.execute("""SELECT * from subclass""")
        except Exception():
            print("I can't SELECT from subclass")
        subclasses = self.cur.fetchall()
        # user = User.objects.filter(username='dfafdaf')
        # print(user)
        # print("TESTED USER ADD")
        if not TEST:
            for sc in subclasses:
                uid = sc['id']
                title = sc['description']
                value = sc['subclass']
                user = self.getUser(sc['assigned'])
                if Subclass.objects.filter(pk=uid).exists():
                    var = Subclass.objects.get(pk=uid)
                    var.title = title
                    var.number = value
                    var.owner = user
                    var.save()
                else:
                    newVar = Subclass(pk=uid, title=title, number=value,
                                      owner=user)
                    newVar.save()

    def getUser(self, uname):
        user = None
        # print("USERNAME:{}".format(uname))
        if uname == "purchasing":
            try:
                user = User.objects.get(username="purchasing")
            except Exception as e:
                user = User.objects.create_user(uname)
                user.first_name = "Purchasing"
                user.last_nmae = "Test"
            return user
        if uname:
            self.cur.execute("""SELECT * FROM person WHERE username = %s""",
                             (uname,))
            info = self.cur.fetchone()

            if User.objects.filter(username=uname).exists():
                user = User.objects.get(username=uname)
            else:
                user = User.objects.create_user(uname)
            if info:
                if (info['firstname']):
                    user.first_name = info['firstname']
                else:
                    user.first_name = uname
                if (info['lastname']):
                    user.last_name = info['lastname']
                else:
                    user.last_name = uname
                if (info['email']):
                    user.email = info['email']
                user.save()
            # print("NAME {} {}".format(user.first_name, user.last_name))
        return user

    def transferPresetPermission(self):
        return

    def transferAccountCategories(self):
        TEST = False
        print("In categories")
        try:
            self.cur.execute("""SELECT * from accounttypes""")
        except Exception():
            print("I can't SELECT from accounttypes")
        categories = self.cur.fetchall()
        if not TEST:
            for c in categories:
                uid = c['id']
                number = c['accountno']
                title = c['description']
                if Account.objects.filter(pk=uid).exists():
                    var = Account.objects.get(pk=uid)
                    var.title = title
                    var.number = number
                    var.save()
                else:
                    newVar = Account(pk=uid, title=title, number=number)
                    newVar.save()

    def transferPresets(self):
        TEST = False
        print("IN presets")
        try:
            self.cur.execute("""SELECT * from account_preset""")
        except Exception():
            print("I can't SELECT from account_preset's")
        # TODO: map preset permissions to preset_users
        presets = self.cur.fetchall()
        if not TEST:
            for p in presets:
                stid = p['speedtype_id']
                scid = p['subclass_id']
                isSubclass = Subclass.objects.filter(pk=scid).exists()
                isSpeedtype = Speedtype.objects.filter(pk=stid).exists()
                if not isSubclass or not isSpeedtype:
                    continue
                uid = p['id']
                title = p['title']
                if ChemPreset.objects.filter(pk=uid).exists():
                    var = ChemPreset.objects.get(pk=uid)
                    var.preset_title = title
                    var.speedtype_id = stid
                    var.subclass_id = scid
                else:
                    newVar = ChemPreset(pk=uid, preset_title=title,
                                        speedtype_id=stid, subclass_id=scid)
                    newVar.save()

    def transferNonChemPresets():
        # TODO: map nonchempresets
        return
