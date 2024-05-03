    var role;
var username;
var tids;
var records;

function formatDt(date) {
    var res = date.replace(" ", "0");
    var dt = res.slice(0, 4) + "-" + res.slice(4, 6) + "-" + res.slice(6, 8) + " " + res.slice(8, 10)
    + "-" + res.slice(10, 12) + "-" + res.slice(12, 14);
    return dt;
}

function formatAmt(amt)
{
    var t = parseFloat(amt);
    var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return famt;
}

function getTransactionType(mti, proc)
{
    if(mti === "0200" && proc.slice(0, 2) == "00")
        return "PURCHASE";
    return "UNKNOWN";
}

function getMod(d)
{
    var m = d.length % 2;
    if(m != 0)
        return d + ".";
    else
        return d;
}

function gotoPrint(id)
{
    var index = 0;
    /*for(var i = 0; i < tids.length; i++)
    {
        if(tids[i].tid === records[id].terminal_id)
            index = i;
    }*/

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.swal-wide { width:400px !important; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    var datetime = records[id].date_trans;
    var dt = "";
    if(datetime.length == 14)
        dt = formatDt(datetime);
    else
        dt = datetime;
    
    var print = "<div id=\"div_print\" style=\"width: 350px;\">";

    /*print += "<p style=\"text-align: center;\">" + tids[index].bankname + "</br></p>";
    print += "<p style=\"text-align: center;\">" + tids[index].merchantname + "</br></p>";
    print += "<p style=\"text-align: center;\">" + tids[index].merchantaddress + "</br></p>";*/

    var pp = "";
    pp = sprintf("%-12.12s %18.18s", "TERMINAL ID:", records[id].terminal_id);
    print += "<p align=\"left\">TERMINAL ID: <span style=\"float:right;\">" + records[id].terminal_id + "</span></br></p>";

    //pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", tids[index].serialnumber);
    //print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + tids[index].serialnumber + "</span></br></p>";

    pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", "NOT STORED");
    print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";

    pp = sprintf("%-12.12s %18.18s", "MERCHANT ID:", records[id].merchant_id);
    print += "<p align=\"left\">MERCHANT ID: <span style=\"float:right;\">" + records[id].merchant_id + "</span></br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    var v = setResponseCode(records[id].response_code);
    pp = sprintf("   %*s%*s   ", 12 + getMod(v).length / 2, 
        getMod(v), 
        12 - getMod(v).length / 2, "");
    print += "<p style=\"text-align: center;\">" + v.toUpperCase() + "</br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-12.12s %18.18s", "TRANSACTION:", getTransactionType(records[id].mti, records[id].processing_code));
    print += "<p align=\"left\">TRANSACTION: <span style=\"float:right;\">" + getTransactionType(records[id].mti, records[id].processing_code) + "</span></br></p>";
    
    pp = sprintf("%-14.14s %16.16s", "RESPONSE CODE:", records[id].response_code);
    print += "<p align=\"left\">RESPONSE CODE: <span style=\"float:right;\">" + records[id].response_code + "</span></br></p>";

    pp = sprintf("%-10.10s %20.20s", "AUTH CODE:", records[id].auth_code);
    print += "<p align=\"left\">AUTH CODE: <span style=\"float:right;\">" + records[id].auth_code + "</span></br></p>";

    pp = sprintf("%-5.5s %25.25s", "STAN:", records[id].stan);
    print += "<p align=\"left\">STAN: <span style=\"float:right;\">" + records[id].stan + "</span></br></p>";

    pp = sprintf("%-4.4s %26.26s", "RRN:", records[id].rrn);
    print += "<p align=\"left\">RRN: <span style=\"float:right;\">" + records[id].rrn + "</span></br></p>";

    pp = sprintf("%-12.12s %18.18s", dt.slice(0, 10), dt.slice(11));
    print += "<p align=\"left\">" + dt.slice(0, 10) + " <span style=\"float:right;\">" + dt.slice(11) + "</span></br></p>";
    

    var amt = records[id].amount;
    var t = parseFloat(amt);
    var famt = "NGN " + (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    pp = sprintf("%-6.6s %24.24s", "TOTAL:", famt);
    print += "<p align=\"left\">TOTAL: <span style=\"float:right;\">" + famt + "</span></br></p>";

    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-4.4s %26.26s", "PAN:", records[id].masked_pan);
    print += "<p align=\"left\">PAN: <span style=\"float:right;\">" + records[id].masked_pan + "</span></br></p>";
    
    pp = sprintf("%-12.12s %18.18s", "EXPIRY DATE:", "**/**");
    print += "<p align=\"left\">EXPIRY DATE: <span style=\"float:right;\">" + "**/**" + "</span></br></p>";
    
    if(records[id].masked_pan === "000000******0000")
    {
        var d = "CASH";
        pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
            12 - d.length / 2, "");
        print += "<p style=\"text-align: center;\">" + d + "</p>";
    }else
    {
        pp = sprintf("%-20.20s %10.10s", "VERIFICATION METHOD:", "PIN");
        print += "<p align=\"left\">VERIFICATION METHOD: <span style=\"float:right;\">" + "PIN" + "</span></br></p>";
    }

    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-15.15s %15.15s", "PRINTER NUMBER:", "****");
    print += "<p align=\"left\">PRINTER NUMBER: <span style=\"float:right;\">" + "****" + "</span></br></p>";
    
    //pp = sprintf("%-8.8s %22.22s", "VERSION:", tids[index].initapplicationversion);
    //print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + tids[index].initapplicationversion + "</span></br></p>";
    
    pp = sprintf("%-8.8s %22.22s", "VERSION:", "NOT STORED");
    print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    var d = "PTSP: BizzdeskGroup ";
    pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
        12 - d.length / 2, "");
    print += "<p style=\"text-align: center;\">" + d + "</p>";
    
    pp = sprintf("   %*s%*s   ", 12 + "Powerred by ETOP. ".length / 2, "Powerred by ETOP. ", 
        12 - "Powerred by ETOP. ".length / 2, "");
    print += "<p style=\"text-align: center;\">" + "Powerred by ETOP. " + "</p>";
    
    pp = sprintf("   %*s%*s   ", 12 + "tms COPY. ".length / 2, "tms COPY. ", 
        12 - "tms COPY. ".length / 2, "");
    print += "<p style=\"text-align: center;\">" + "tms COPY. " + "</p>";

    if(records[id].extras)
    {
        print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
        print += "<p style=\"text-align: center;\">" + "PAYMENT DETAILS" + "</p>";
        print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
        var store = "";
        for(var m = 0; m < records[id].extras.length; m++)
        {
            if(records[id].extras.charAt(m) === '.')
                store = store + "</br>";
            else if(records[id].extras.charAt(m) === '=')
                store = store + ": ";
            else
                store = store + records[id].extras.charAt(m);
            
        }
        print += "<p style=\"text-align: center;\">" + store + "</p>";
    }

    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    print += "</div>";
    swal({
        title: 'REPRINT',
        text: "LOVE",
        html: print,
        type: "success",
        customClass: 'swal-wide',
        showCancelButton: false,
        showConfirmButton:true
    });

    var printWindow = window.open();
    printWindow.document.open('text/plain')
    
    printWindow.document.write(document.getElementById('div_print').innerHTML);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

function gotoView(id)
{
    var index = 0;
    /*for(var i = 0; i < tids.length; i++)
    {
        if(tids[i].tid === records[id].terminal_id)
            index = i;
    }*/

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.swal-wide { width:400px !important; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    var datetime = records[id].date_trans;
    var dt = "";
    if(datetime.length == 14)
        dt = formatDt(datetime);
    else
        dt = datetime;
    
    var print = "<div id=\"div_print\" style=\"width: 350px;\">";


    /*print += "<p style=\"text-align: center;\">" + tids[index].bankname + "</br></p>";
    print += "<p style=\"text-align: center;\">" + tids[index].merchantname + "</br></p>";
    print += "<p style=\"text-align: center;\">" + tids[index].merchantaddress + "</br></p>";*/


    var pp = "";
    pp = sprintf("%-12.12s %18.18s", "TERMINAL ID:", records[id].terminal_id);
    print += "<p align=\"left\">TERMINAL ID: <span style=\"float:right;\">" + records[id].terminal_id + "</span></br></p>";

    //pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", tids[index].serialnumber);
    //print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + tids[index].serialnumber + "</span></br></p>";

    pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", "NOT STORED");
    print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";

    pp = sprintf("%-12.12s %18.18s", "MERCHANT ID:", records[id].merchant_id);
    print += "<p align=\"left\">MERCHANT ID: <span style=\"float:right;\">" + records[id].merchant_id + "</span></br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    var v = setResponseCode(records[id].response_code);
    pp = sprintf("   %*s%*s   ", 12 + getMod(v).length / 2, 
        getMod(v), 
        12 - getMod(v).length / 2, "");
    print += "<p style=\"text-align: center;\">" + v.toUpperCase() + "</br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-12.12s %18.18s", "TRANSACTION:", getTransactionType(records[id].mti, records[id].processing_code));
    print += "<p align=\"left\">TRANSACTION: <span style=\"float:right;\">" + getTransactionType(records[id].mti, records[id].processing_code) + "</span></br></p>";
    
    pp = sprintf("%-14.14s %16.16s", "RESPONSE CODE:", records[id].response_code);
    print += "<p align=\"left\">RESPONSE CODE: <span style=\"float:right;\">" + records[id].response_code + "</span></br></p>";

    pp = sprintf("%-10.10s %20.20s", "AUTH CODE:", records[id].auth_code);
    print += "<p align=\"left\">AUTH CODE: <span style=\"float:right;\">" + records[id].auth_code + "</span></br></p>";

    pp = sprintf("%-5.5s %25.25s", "STAN:", records[id].stan);
    print += "<p align=\"left\">STAN: <span style=\"float:right;\">" + records[id].stan + "</span></br></p>";

    pp = sprintf("%-4.4s %26.26s", "RRN:", records[id].rrn);
    print += "<p align=\"left\">RRN: <span style=\"float:right;\">" + records[id].rrn + "</span></br></p>";

    pp = sprintf("%-12.12s %18.18s", dt.slice(0, 10), dt.slice(11));
    print += "<p align=\"left\">" + dt.slice(0, 10) + " <span style=\"float:right;\">" + dt.slice(11) + "</span></br></p>";
    

    var amt = records[id].amount;
    var t = parseFloat(amt);
    var famt = "NGN " + (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    pp = sprintf("%-6.6s %24.24s", "TOTAL:", famt);
    print += "<p align=\"left\">TOTAL: <span style=\"float:right;\">" + famt + "</span></br></p>";


    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-4.4s %26.26s", "PAN:", records[id].masked_pan);
    print += "<p align=\"left\">PAN: <span style=\"float:right;\">" + records[id].masked_pan + "</span></br></p>";
    
    pp = sprintf("%-12.12s %18.18s", "EXPIRY DATE:", "**/**");
    print += "<p align=\"left\">EXPIRY DATE: <span style=\"float:right;\">" + "**/**" + "</span></br></p>";
    
    if(records[id].masked_pan === "000000******0000")
    {
        var d = "CASH";
        pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
            12 - d.length / 2, "");
        print += "<p style=\"text-align: center;\">" + d + "</p>";
    }else
    {
        pp = sprintf("%-20.20s %10.10s", "VERIFICATION METHOD:", "PIN");
        print += "<p align=\"left\">VERIFICATION METHOD: <span style=\"float:right;\">" + "PIN" + "</span></br></p>";
    }

    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    pp = sprintf("%-15.15s %15.15s", "PRINTER NUMBER:", "****");
    print += "<p align=\"left\">PRINTER NUMBER: <span style=\"float:right;\">" + "****" + "</span></br></p>";
    
    //pp = sprintf("%-8.8s %22.22s", "VERSION:", tids[index].initapplicationversion);
    //print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + tids[index].initapplicationversion + "</span></br></p>";
    pp = sprintf("%-8.8s %22.22s", "VERSION:", "NOT STORED");
    print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";
    
    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    var d = "PTSP: BizzdeskGroup ";
    pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
        12 - d.length / 2, "");
    print += "<p style=\"text-align: center;\">" + d + "</p>";
    
    pp = sprintf("   %*s%*s   ", 12 + "Powerred by ETOP. ".length / 2, "Powerred by ETOP. ", 
        12 - "Powerred by ETOP. ".length / 2, "");
    print += "<p style=\"text-align: center;\">" + "Powerred by ETOP. " + "</p>";
    
    pp = sprintf("   %*s%*s   ", 12 + "tms COPY. ".length / 2, "tms COPY. ", 
        12 - "tms COPY. ".length / 2, "");
    print += "<p style=\"text-align: center;\">" + "tms COPY. " + "</p>";

    if(records[id].extras)
    {
        print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
        print += "<p style=\"text-align: center;\">" + "PAYMENT DETAILS" + "</p>";
        print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
        var store = "";
        for(var m = 0; m < records[id].extras.length; m++)
        {
            if(records[id].extras.charAt(m) === '.')
                store = store + "</br>";
            else if(records[id].extras.charAt(m) === '=')
                store = store + ": ";
            else
                store = store + records[id].extras.charAt(m);
            
        }
        print += "<p style=\"text-align: center;\">" + store + "</p>";
    }

    pp = "\n..............................";
    print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
    
    print += "</div>";
    swal({
        title: 'VIEW',
        text: "LOVE",
        html: print,
        type: "success",
        customClass: 'swal-wide',
        showCancelButton: false,
        showConfirmButton:true
    });
}

$("#exportbutton").click(function(e){
    $("#exportbutton").text("Please Wait");
    $("#exportbutton").prop("disabled",true);
    var table = $('#bootstrap-data-table').DataTable();
    var data = table.rows({filter: 'applied'}).data();
    var exp = [];
    for(var i = 0; i < data.length; i++)
    {
        exp.push(records[i]);
    }
    var myTestXML = new myExcelXML(JSON.stringify(exp));
    myTestXML.downLoad();
    $("#exportbutton").text("Please Reload Page");
    $("#exportbutton").prop("disabled",false);
});

function setResponseCode(code)
{
    if(code == null)
	return "No Response";
	if(code == "00")
    {
        return "Approved..";
    }else if(code == "01")
    {
        return "Refer to card issuer, special condition";
    }else if(code == "02")
    {
        return "Refer to card issuer";
    }else if(code == "03")
    {
        return "Invalid merchant";
    }else if(code == "04")
    {
        return "Pick-up card";
    }else if(code == "05")
    {
        return "Do not honor";
    }else if(code == "06")
    {
        return "Error";
    }else if(code == "07")
    {
        return "Pick-up card, special condition";
    }else if(code == "08")
    {
        return "Honor with identification";
    }else if(code == "09")
    {
        return "Request in progress";
    }else if(code == "10")
    {
        return "Approved, partial";
    }else if(code == "11")
    {
        return "Approved, VIP";
    }else if(code == "12")
    {
        return "Invalid transaction";
    }else if(code == "13")
    {
        return "Invalid amount";
    }else if(code == "14")
    {
        return "Invalid card number";
    }else if(code == "15")
    {
        return "No such issuer";
    }else if(code == "16")
    {
        return "Approved, update track 3";
    }else if(code == "17")
    {
        return "Customer cancellation";
    }else if(code == "18")
    {
        return "Customer dispute";
    }else if(code == "19")
    {
        return "Re-enter transaction";
    }else if(code == "20")
    {
        return "Invalid response";
    }else if(code == "21")
    {
        return "No action taken";
    }else if(code == "22")
    {
        return "Suspected malfunction";
    }else if(code == "23")
    {
        return "Unacceptable transaction fee";
    }else if(code == "24")
    {
        return "File update not supported";
    }else if(code == "25")
    {
        return "Unable to locate record";
    }else if(code == "26")
    {
        return "Duplicate record";
    }else if(code == "27")
    {
        return "File update field edit error";
    }else if(code == "28")
    {
        return "File update file locked";
    }else if(code == "29")
    {
        return "File update failed";
    }else if(code == "30")
    {
        return "Format error";
    }else if(code == "31")
    {
        return "Bank not supported";
    }else if(code == "32")
    {
        return "Completed partially";
    }else if(code == "33")
    {
        return "Expired card, pick-up";
    }else if(code == "34")
    {
        return "Suspected fraud, pick-up";
    }else if(code == "35")
    {
        return "Contact acquirer, pick-up";
    }else if(code == "36")
    {
        return "Restricted card, pick-up";
    }else if(code == "37")
    {
        return "Call acquirer security, pick-up";
    }else if(code == "38")
    {
        return "PIN tries exceeded, pick-up";
    }else if(code == "39")
    {
        return "No credit account";
    }else if(code == "40")
    {
        return "Function not supported";
    }else if(code == "41")
    {
        return "Lost card, pick-up";
    }else if(code == "42")
    {
        return "No universal account";
    }else if(code == "43")
    {
        return "Stolen card, pick-up";
    }else if(code == "44")
    {
        return "No investment account";
    }else if(code == "45")
    {
        return "Account closed";
    }else if(code == "46")
    {
        return "Identification required";
    }else if(code == "47")
    {
        return "Identification cross-check required";
    }else if(code == "48")
    {
        return "Error";
    }else if(code == "49")
    {
        return "Error";
    }else if(code == "50")
    {
        return "Error";
    }else if(code == "51")
    {
        return "Insufficient funds";
    }else if(code == "52")
    {
        return "No check account";
    }else if(code == "53")
    {
        return "No savings account";
    }else if(code == "54")
    {
        return "Expired card";
    }else if(code == "55")
    {
        return "Incorrect PIN";
    }else if(code == "56")
    {
        return "No card record";
    }else if(code == "57")
    {
        return "Transaction not permitted to cardholder";
    }else if(code == "58")
    {
        return "Transaction not permitted on terminal";
    }else if(code == "59")
    {
        return "Suspected fraud";
    }else if(code == "60")
    {
        return "Contact acquirer";
    }else if(code == "61")
    {
        return "Exceeds withdrawal limit";
    }else if(code == "62")
    {
        return "Restricted card";
    }else if(code == "63")
    {
        return "Security violation";
    }else if(code == "64")
    {
        return "Original amount incorrect";
    }else if(code == "65")
    {
        return "Exceeds withdrawal frequency";
    }else if(code == "66")
    {
        return "Call acquirer security";
    }else if(code == "67")
    {
        return "Hard capture";
    }else if(code == "68")
    {
        return "Response received too late";
    }else if(code == "69")
    {
        return "Advice received too late";
    }else if(code == "70")
    {
        return "Error";
    }else if(code == "71")
    {
        return "Error";
    }else if(code == "72")
    {
        return "Error";
    }else if(code == "73")
    {
        return "Error";
    }else if(code == "74")
    {
        return "Error";
    }else if(code == "75")
    {
        return "PIN tries exceeded";
    }else if(code == "76")
    {
        return "Error";
    }else if(code == "77")
    {
        return "Intervene, bank approval required";
    }else if(code == "78")
    {
        return "Intervene, bank approval required for partial amount";
    }else if(code == "79")
    {
        return "Error";
    }else if(code == "80")
    {
        return "Error";
    }else if(code == "81")
    {
        return "Error";
    }else if(code == "82")
    {
        return "Error";
    }else if(code == "83")
    {
        return "Error";
    }else if(code == "84")
    {
        return "Error";
    }else if(code == "85")
    {
        return "Error";
    }
    
    
    else if(code == "86")
    {
        return "Could Not Connect";
    }else if(code == "87")
    {
        return "Could Not Connect";
    }else if(code == "88")
    {
        return "No Response From Nibss";
    }else if(code == "89")
    {
        return "No Response From Nibss";
    }
    
    else if(code == "90")
    {
        return "Cut-off in progress";
    }else if(code == "91")
    {
        return "Issuer or switch inoperative";
    }else if(code == "92")
    {
        return "Routing error";
    }else if(code == "93")
    {
        return "Violation of law";
    }else if(code == "94")
    {
        return "Duplicate transaction";
    }else if(code == "95")
    {
        return "Reconcile error";
    }else if(code == "96")
    {
        return "System malfunction";
    }else if(code == "97")
    {
        return "Reserved for future Postilion use";
    }else if(code == "98")
    {
        return "Exceeds cash limit";
    }else if(code == "99")
    {
        return "Error";
    }else
    {
        return "Response Unknown";
    }
}

function checkPlease(value)
{
    if(role !== "user")
        return false;
    return true;
    /*for(var i=0; i<tids.length; i++){
        if(tids[i].tid === value){
            return true;
        }
    }
    return false;*/
}

$("#loadOneTidOneWeek").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/
    $("#loadOneTidOneWeek").text("Please Wait");
    $("#loadOneTidOneWeek").prop("disabled",true);
    swal({
        title: 'Transactions For 7 Days',
        text: "Terminal Id",
		input: 'text',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Fetch'
    }).then(function (result) {
		if (result.value) 
		{
			$('#loadOneTidOneWeek').html('Loading...');
			$('#loadOneTidOneWeek').prop("disabled", true);
			var table = $('#bootstrap-data-table').DataTable({
					"language": {
						"emptyTable": "Please Wait. Loading..."
					},
					"bDestroy": true
			});
            table.clear().draw();
            
            if(role !== "user")
            {
                return;
                var td = result.value;
                if(td.length != 8)
                {
                    swal(
                        'Not Authorized!',
                        "Incorrect Tid.",
                        'error'
                    );
                    $('#loadOneTidOneWeek').html('View Tid Last One Week');
					$('#loadOneTidOneWeek').prop("disabled", false);
                    return;
                }else
                {
                    var j = 0;
                    var i = tids.length - 1;
                    for(; i > -1; i--) {
                        if(tids[i].tid === td)
                        {
                            j = 1;
                            break;
                        }
                    }
                    if(j == 0)
                    {
                        swal(
                            'Not Authorized!',
                            "Incorrect Tid.",
                            'error'
                        );
                        $('#loadOneTidOneWeek').html('View Tid Last One Week');
                        $('#loadOneTidOneWeek').prop("disabled", false);
                        return;
                    }
                }
            }else
            {
                $.ajax({
                    url: "/tms/transaction/getOneWeek/" + result.value,
                    async: true,
                    dataType: 'json',
                    success: function (data) {
                        records = data;
                        var value = "";
                        if(records.length < 1)
                        {
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "No Records Found"
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                            $('#loadOneTidOneWeek').html('View Last One Week');
                            $('#loadOneTidOneWeek').prop("disabled", false);
                            return;
                        }
                        
                        for (var i = 0; i < records.length; i++) 
                        {
                            arr = [];
                            arr.push(records[i].terminal_id);
                            arr.push(setResponseCode(records[i].response_code));
                            arr.push(records[i].masked_pan);
                            if(records[i].auth_code) 
                                arr.push(records[i].auth_code);
                            else
                                arr.push("NA");
                            var amt = records[i].amount;
                            var t = parseFloat(amt);
                            var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            arr.push("NGN " + famt);
                            arr.push(records[i].extras);
                            arr.push(records[i].tap);
                            var datetime = records[i].date_trans;
                            var dt = "";
                            if(datetime.length == 14)
                                dt = formatDt(datetime);
                            else
                                dt = datetime;
                            arr.push(dt);
    
                            arr.push(records[i].paymentmethod);
    
                            arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                            "<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");
                            if(checkPlease(records[i].terminal_id) === false)
                            {
                                //console.log("Nothing found")
                                continue;
                            }
                            $('#bootstrap-data-table').DataTable().row.add(arr);
                        }
                        $('#bootstrap-data-table').DataTable().draw();
                        $('#loadOneTidOneWeek').html('View Tid Last One Week');
                        $('#loadOneTidOneWeek').prop("disabled", false);
                    },
                    error : function(xhr,errmsg,err) {
                        $('#loadOneTidOneWeek').html('Reload Page');
                        $('#loadOneTidOneWeek').prop("disabled", false);
                        var table = $('#bootstrap-data-table').DataTable({
                                "language": {
                                    "emptyTable": "Please Reload Page."
                                },
                                "bDestroy": true
                        });
                        table.clear().draw();
                    }
                });
            }
		}else
        {

        }
    });
    $("#loadOneTidOneWeek").text("View Last One Week");
    $("#loadOneTidOneWeek").prop("disabled",false);
});

$("#loadOneTid").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/
    $("#loadOneTid").text("Please Wait");
    $("#loadOneTid").prop("disabled",true);
    swal({
        title: 'Transactions',
        text: "Terminal Id",
		input: 'text',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Fetch'
    }).then(function (result) {
		if (result.value) 
		{
			$('#loadOneTid').html('Loading...');
			$('#loadOneTid').prop("disabled", true);
			var table = $('#bootstrap-data-table').DataTable({
					"language": {
						"emptyTable": "Please Wait. Loading..."
					},
					"bDestroy": true
			});
            table.clear().draw();
            if(role !== "user")
            {
                return;
                var td = result.value;
                if(td.length != 8)
                {
                    swal(
                        'Not Authorized!',
                        "Incorrect Tid.",
                        'error'
                    );
                    $('#loadOneTidOneWeek').html('View Tid Last One Week');
					$('#loadOneTidOneWeek').prop("disabled", false);
                    return;
                }else
                {
                    var j = 0;
                    var i = tids.length - 1;
                    for(; i > -1; i--) {
                        if(tids[i].tid === td)
                        {
                            j = 1;
                            break;
                        }
                    }
                    if(j == 0)
                    {
                        swal(
                            'Not Authorized!',
                            "Incorrect Tid.",
                            'error'
                        );
                        $('#loadOneTidOneWeek').html('View Tid Last One Week');
                        $('#loadOneTidOneWeek').prop("disabled", false);
                        return;
                    }
                }
            }else
            {
                $.ajax({
                    url: "/tms/transaction/getTidToday/" + result.value,
                    async: true,
                    dataType: 'json',
                    success: function (data) {
                        records = data;
                        if(records.length < 1)
                        {
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "No Records Found"
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                            $('#loadOneTid').html('View Tid Today');
                            $('#loadOneTid').prop("disabled", false);
                            return;
                        }
                        for (var i = 0; i < records.length; i++) 
                        {
                            arr = [];
                            arr.push(records[i].terminal_id);
                            arr.push(setResponseCode(records[i].response_code));
                            arr.push(records[i].masked_pan);
                            if(records[i].auth_code) 
                                arr.push(records[i].auth_code);
                            else
                                arr.push("NA");
                            var amt = records[i].amount;
                            var t = parseFloat(amt);
                            var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            arr.push("NGN " + famt);
                            arr.push(records[i].extras);
                            arr.push(records[i].tap);
                            var datetime = records[i].date_trans;
                            var dt = "";
                            if(datetime.length == 14)
                                dt = formatDt(datetime);
                            else
                                dt = datetime;
                            arr.push(dt);
    
                            arr.push(records[i].paymentmethod);
    
                            arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                            "<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");
                            if(checkPlease(records[i].terminal_id) === false)
                            {
                                //console.log("Nothing found")
                                continue;
                            }       
                            $('#bootstrap-data-table').DataTable().row.add(arr);
                        }
                        $('#bootstrap-data-table').DataTable().draw();
                        $('#loadOneTid').html('View Tid Today');
                        $('#loadOneTid').prop("disabled", false);
                    },
                    error : function(xhr,errmsg,err) {
                        $('#loadOneTid').html('Reload Page');
                        $('#loadOneTid').prop("disabled", false);
                        var table = $('#bootstrap-data-table').DataTable({
                                "language": {
                                    "emptyTable": "Please Reload Page."
                                },
                                "bDestroy": true
                        });
                        table.clear().draw();
                    }
                });
            }
		}else
        {

        }
    });
    $("#loadOneTid").text("View Tid Today");
    $("#loadOneTid").prop("disabled",false);
});

$("#loadallTids").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/
    $("#loadallTids").text("Please Wait");
    $("#loadallTids").prop("disabled",true);
	var table = $('#bootstrap-data-table').DataTable({
			"language": {
				"emptyTable": "Please Wait. Loading..."
			},
			"bDestroy": true
	});
	table.clear().draw();
	$.ajax({
		url: "/tms/transaction/getAllToday",
		async: true,
		dataType: 'json',
		success: function (data) {
            //console.log(tids);
			records = data;
			if(records.length < 1)
			{
				var table = $('#bootstrap-data-table').DataTable({
						"language": {
							"emptyTable": "No Records Found"
						},
						"bDestroy": true
				});
				table.clear().draw();
				$('#loadallTids').html("Today's Transactions");
				$('#loadallTids').prop("disabled", false);
				return;
			}
			for (var i = 0; i < records.length; i++) 
			{
                arr = [];
				arr.push(records[i].terminal_id);
				arr.push(setResponseCode(records[i].response_code));
				arr.push(records[i].masked_pan);
				if(records[i].auth_code) 
					arr.push(records[i].auth_code);
                else
					arr.push("NA");
				var amt = records[i].amount;
				var t = parseFloat(amt);
				var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                arr.push("NGN " + famt);
                arr.push(records[i].extras);
                arr.push(records[i].tap);
                var datetime = records[i].date_trans;
                var dt = "";
                if(datetime.length == 14)
                    dt = formatDt(datetime);
                else
                    dt = datetime;
                arr.push(dt);

                arr.push(records[i].paymentmethod);
                
				arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                        "<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");
                if(checkPlease(records[i].terminal_id) === false)
                {
                    //console.log("Nothing found")
                    continue;
                }       
                $('#bootstrap-data-table').DataTable().row.add(arr);
			}
			$('#bootstrap-data-table').DataTable().draw();
			$('#loadallTids').html("Today's Transactions");
			$('#loadallTids').prop("disabled", false);
		},
		error : function(xhr,errmsg,err) {
			$('#loadallTids').html('Reload Page');
			$('#loadallTids').prop("disabled", false);
			var table = $('#bootstrap-data-table').DataTable({
					"language": {
						"emptyTable": "Please Reload Page."
					},
					"bDestroy": true
			});
			table.clear().draw();
        }
	});
    $("#loadallTids").text("Today's Transactions");
    $("#loadallTids").prop("disabled",false);
});

$("#transactionviewer").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/
    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">TID</label>";
    use += "<input id=\"tid\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"8\" value=\"\" placeholder=\"Terminal Id\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">RRN</label>";
    use += "<input id=\"rrn\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"12\" value=\"\" placeholder=\"Reference Number\">";
    use += "</div>"

    swal({
        title: 'Query',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Search'
    }).then(function (result) {
        if (result.value) 
        {
            var tid = $("#tid").val();
            var rrn = $("#rrn").val();
            if(tid.length < 1 || tid.length > 8 ||
                rrn.length > 12 || rrn.length < 1)
            {
                swal(
                    'Error',
                    'Invalid Search Parameters',
                    'error'
                );
                return;
            }else
            {
                $('#transactionviewer').html('Loading...');
                $('#transactionviewer').prop("disabled", true);
                var table = $('#bootstrap-data-table').DataTable({
                        "language": {
                            "emptyTable": "Please Wait. Loading..."
                        },
                        "bDestroy": true
                });
                table.clear().draw();

                if(role !== "user")
                {
                    return;
                    var td = tid;
                    if(1)
                    {
                        var j = 0;
                        var i = tids.length - 1;
                        for(; i > -1; i--) {
                            if(tids[i].tid === td)
                            {
                                j = 1;
                                break;
                            }
                        }
                        if(j == 0)
                        {
                            swal(
                                'Not Authorized!',
                                "Incorrect Tid.",
                                'error'
                            );
                            $("#transactionviewer").text("Transaction Viewer");
                            $("#transactionviewer").prop("disabled",false);
                            return;
                        }
                    }
                }else
                {
                    var fd = new FormData();
                    fd.append('tid', tid);
                    fd.append('rrn', rrn);
                    $.ajax({
                        type: "POST",
                        url: "/tms/transaction/gettransaction",
                        data : fd,
                        processData: false,
                        contentType: false,

                        //async: true,
                        //dataType: 'json',

                        success: function (data) {
                            records = JSON.parse(data);
                            if(records.length < 1)
                            {
                                var table = $('#bootstrap-data-table').DataTable({
                                        "language": {
                                            "emptyTable": "No Records Found"
                                        },
                                        "bDestroy": true
                                });
                                table.clear().draw();
                                $("#transactionviewer").text("Transaction Viewer");
                                $("#transactionviewer").prop("disabled",false);
                                return;
                            }
                            //console.log(records);
                            for (var i = 0; i < records.length; i++) 
                            {
                                arr = [];
                                arr.push(records[i].terminal_id);
                                arr.push(setResponseCode(records[i].response_code));
                                arr.push(records[i].masked_pan);
                                if(records[i].auth_code) 
                                    arr.push(records[i].auth_code);
                                else
                                    arr.push("NA");
                                var amt = records[i].amount;
                                var t = parseFloat(amt);
                                var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                arr.push("NGN " + famt);
                                arr.push(records[i].extras);
                                arr.push(records[i].tap);
                                var datetime = records[i].date_trans;
                                var dt = "";
                                
                                if(datetime.length == 14)
                                    dt = formatDt(datetime);
                                else
                                    dt = datetime;
                                
                                arr.push(dt);

                                arr.push(records[i].paymentmethod);

                                arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                                "<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");
                                if(checkPlease(records[i].terminal_id) === false)
                                {
                                    //console.log("Nothing found")
                                    continue;
                                }       
                                $('#bootstrap-data-table').DataTable().row.add(arr);
                            }
                            $('#bootstrap-data-table').DataTable().draw();
                            $("#transactionviewer").text("Transaction Viewer");
                            $("#transactionviewer").prop("disabled",false);
                        },
                        error : function(xhr,errmsg,err) {
                            $("#transactionviewer").text("Reload Page");
                            $("#transactionviewer").prop("disabled",false);
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "Please Reload Page."
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                        }
                    });
                }
            }
		}else
        {

        }
    });
    $("#transactionviewer").text("Transaction Viewer");
    $("#transactionviewer").prop("disabled",false);
});

$("#tidview").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/

    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">TID</label>";
    use += "<input id=\"tid\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"8\" value=\"\" placeholder=\"Terminal Id\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Start Date</label>";
    use += "<input id=\"startdate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">End Date</label>";
    use += "<input id=\"enddate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    swal({
        title: 'Query',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Search and View'
    }).then(function (result) {
        if (result.value) 
        {
            var tid = $("#tid").val();
            var sd = $("#startdate").val();
            var ed = $("#enddate").val();
            if(tid.length < 1 || tid.length > 8)
            {
                swal(
                    'Error',
                    'Invalid Search Parameters',
                    'error'
                );
                return;
            }else
            {
                $('#tidview').html('Loading...');
                $('#tidview').prop("disabled", true);
                /*var table = $('#bootstrap-data-table').DataTable({
                        "language": {
                            "emptyTable": "Please Wait. Loading..."
                        },
                        "bDestroy": true
                });
                table.clear().draw();*/

                if(role !== "user")
                {
                    return;
                    var td = tid;
                    if(1)
                    {
                        var j = 0;
                        var i = tids.length - 1;
                        for(; i > -1; i--) {
                            if(tids[i].tid === td)
                            {
                                j = 1;
                                break;
                            }
                        }
                        if(j == 0)
                        {
                            swal(
                                'Not Authorized!',
                                "Incorrect Tid.",
                                'error'
                            );
                            $("#tidview").text("View Date Range");
                            $("#tidview").prop("disabled",false);
                            return;
                        }
                    }
                }else
                {
                    var fd = new FormData();
                    fd.append('tid', tid);
                    fd.append('sd', sd);
                    fd.append('ed', ed);
                    $.ajax({
                        type: "POST",
                        url: "/tms/transaction/viewdaterange",
                        data : fd,
                        processData: false,
                        contentType: false,

                        //async: true,
                        //dataType: 'json',

                        success: function (data) {
                            records = JSON.parse(data);
                            if(records.length < 1)
                            {
                                var table = $('#bootstrap-data-table').DataTable({
                                        "language": {
                                            "emptyTable": "No Records Found"
                                        },
                                        "bDestroy": true
                                });
                                table.clear().draw();
                                $("#tidview").text("View Date Range");
                                $("#tidview").prop("disabled",false);
                                return;
                            }
                            for (var i = 0; i < records.length; i++) 
                            {
                                arr = [];
                                arr.push(records[i].terminal_id);
                                arr.push(setResponseCode(records[i].response_code));
                                arr.push(records[i].masked_pan);
                                if(records[i].auth_code) 
                                    arr.push(records[i].auth_code);
                                else
                                    arr.push("NA");
                                var amt = records[i].amount;
                                var t = parseFloat(amt);
                                var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                arr.push("NGN " + famt);
                                arr.push(records[i].extras);
                                arr.push(records[i].tap);
                                var datetime = records[i].date_trans;
                                var dt = "";
                                
                                if(datetime.length == 14)
                                    dt = formatDt(datetime);
                                else
                                    dt = datetime;
                                
                                arr.push(dt);

                                arr.push(records[i].paymentmethod);

                                arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                                "<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");
                                if(checkPlease(records[i].terminal_id) === false)
                                {
                                    //console.log("Nothing found")
                                    continue;
                                }       
                                $('#bootstrap-data-table').DataTable().row.add(arr);
                            }
                            $('#bootstrap-data-table').DataTable().draw();
                            $("#tidview").text("View Date Range");
                            $("#tidview").prop("disabled",false);
                        },

                        error : function(xhr,errmsg,err) {
                            $("#tidview").text("View Date Range");
                            $("#tidview").prop("disabled",false);
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "Please Reload Page."
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                        }
                    });
                }
            }
		}else
        {

        }
    });
    $("#tidview").text("View Date Range");
    $("#tidview").prop("disabled",false);
});

$("#tidranger").click(function(e){
    /*if(tids.length < 1)
    {
        swal(
            'Empty!',
            "No Tid Available....",
            'success'
        );
        return;
    }*/

    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">TID</label>";
    use += "<input id=\"tid\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"8\" value=\"\" placeholder=\"Terminal Id\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Start Date</label>";
    use += "<input id=\"startdate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">End Date</label>";
    use += "<input id=\"enddate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    swal({
        title: 'Query',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Search and Export'
    }).then(function (result) {
        if (result.value) 
        {
            var tid = $("#tid").val();
            var sd = $("#startdate").val();
            var ed = $("#enddate").val();
            if(tid.length < 1 || tid.length > 8)
            {
                swal(
                    'Error',
                    'Invalid Search Parameters',
                    'error'
                );
                return;
            }else
            {
                $('#tidranger').html('Loading...');
                $('#tidranger').prop("disabled", true);
                /*var table = $('#bootstrap-data-table').DataTable({
                        "language": {
                            "emptyTable": "Please Wait. Loading..."
                        },
                        "bDestroy": true
                });
                table.clear().draw();*/

                if(role !== "user")
                {
                    return;
                    var td = tid;
                    if(1)
                    {
                        var j = 0;
                        var i = tids.length - 1;
                        for(; i > -1; i--) {
                            if(tids[i].tid === td)
                            {
                                j = 1;
                                break;
                            }
                        }
                        if(j == 0)
                        {
                            swal(
                                'Not Authorized!',
                                "Incorrect Tid.",
                                'error'
                            );
                            $("#tidranger").text("Export Date Range");
                            $("#tidranger").prop("disabled",false);
                            return;
                        }
                    }
                }else
                {
                    var fd = new FormData();
                    fd.append('tid', tid);
                    fd.append('sd', sd);
                    fd.append('ed', ed);
                    $.ajax({
                        type: "POST",
                        url: "/tms/transaction/tidbydaterange",
                        data : fd,
                        processData: false,
                        contentType: false,

                        //async: true,
                        //dataType: 'json',

                        success: function (data) {
                            $("#tidranger").text("Export Date Range");
                            $("#tidranger").prop("disabled",false);
                            window.location.href = "/downloads/" + data;
                        },
                        error : function(xhr,errmsg,err) {
                            $("#tidranger").text("Export Date Range");
                            $("#tidranger").prop("disabled",false);
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "Please Reload Page."
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                        }
                    });
                }
            }
		}else
        {

        }
    });
    $("#tidranger").text("Export Date Range");
    $("#tidranger").prop("disabled",false);
});

$("#tranx").click(function(e){
    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">TID</label>";
    use += "<input id=\"tid\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"8\" value=\"\" placeholder=\"Terminal Id\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Transaction Type</label>";
    use += "<select style=\"color: #001e33; font-weight: bold;\" name=\"cc-ssl\" id=\"txntype\" class=\"form-control\">";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"cards\">CARDS</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"cashout\">CASHOUT</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"transfers\">TRANSFERS</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"vtu\">VTU</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"data\">DATA</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"wallet\">WALLET ACTIVITIES</option>";
        //use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"bills\">BILLS</option>";
        use += "<option style=\"color: #001e33; font-weight: bold;\" value=\"faild\">FAILED AGENCY</option>";
    use += "</select>";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Start Date</label>";
    use += "<input id=\"startdate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">End Date</label>";
    use += "<input id=\"enddate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    swal({
        title: 'Query',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Search and Export'
    }).then(function (result) {
        if (result.value) 
        {
            var tid = $("#tid").val();
            var rrn = $("#rrn").val();
            var txntype = $("#txntype").val();
            var sd = $("#startdate").val();
            var ed = $("#enddate").val();
            /*console.log(tid)
            console.log(rrn)
            console.log(txntype)
            console.log(sd)
            console.log(ed)*/
            if(1)
            {
                $('#tranx').html('Loading...');
                $('#tranx').prop("disabled", true);
                if(role !== "user")
                {
                    return;
                }else
                {
                    var fd = new FormData();
                    fd.append('tid', tid);
                    fd.append('rrn', rrn);
                    fd.append('txntype', txntype);
                    fd.append('sd', sd);
                    fd.append('ed', ed);
                    $.ajax({
                        type: "POST",
                        url: "/tms/transaction/genericsort",
                        data : fd,
                        processData: false,
                        contentType: false,

                        success: function (data) {
                            $("#tranx").text("Filter Transactions");
                            $("#tranx").prop("disabled",false);
                            window.location.href = "/downloads/" + data;
                        },
                        error : function(xhr,errmsg,err) {
                            $("#tranx").text("Filter Transactions");
                            $("#tranx").prop("disabled",false);
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "Please Reload Page."
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                        }
                    });
                }
            }
		}else
        {

        }
    });
    $("#tranx").text("Filter Transactions");
    $("#tranx").prop("disabled",false);
});


function modifyreceipt(id)
{
    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">TID</label>";
    use += "<input id=\"tid\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"8\" value=\"\" placeholder=\"Terminal Id\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">RRN</label>";
    use += "<input id=\"rrn\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"12\" value=\"\" placeholder=\"Rrn\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">STAN</label>";
    use += "<input id=\"stan\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"6\" value=\"\" placeholder=\"Stan\">";
    use += "</div>"

    swal({
        title: 'Modify Receipt',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Print'
    }).then(function (result) {
        if (result.value) 
        {
            var tid = $("#tid").val();
            var rrn = $("#rrn").val();
            var stan = $("#stan").val();
            
            var index = 0;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.swal-wide { width:400px !important; }';
            document.getElementsByTagName('head')[0].appendChild(style);

            var datetime = records[id].date_trans;
            var dt = "";
            if(datetime.length == 14)
                dt = formatDt(datetime);
            else
                dt = datetime;
            
            var print = "<div id=\"div_print\" style=\"width: 350px;\">";

            /*print += "<p style=\"text-align: center;\">" + tids[index].bankname + "</br></p>";
            print += "<p style=\"text-align: center;\">" + tids[index].merchantname + "</br></p>";
            print += "<p style=\"text-align: center;\">" + tids[index].merchantaddress + "</br></p>";*/

            var pp = "";
            if(tid.length < 8)
            {
                pp = sprintf("%-12.12s %18.18s", "TERMINAL ID:", records[id].terminal_id);
                print += "<p align=\"left\">TERMINAL ID: <span style=\"float:right;\">" + records[id].terminal_id + "</span></br></p>";
            }else
            {
                pp = sprintf("%-12.12s %18.18s", "TERMINAL ID:", tid);
                print += "<p align=\"left\">TERMINAL ID: <span style=\"float:right;\">" + tid + "</span></br></p>";
            }

            //pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", tids[index].serialnumber);
            //print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + tids[index].serialnumber + "</span></br></p>";

            pp = sprintf("%-14.14s %16.16s", "SERIAL NUMBER:", "NOT STORED");
            print += "<p align=\"left\">SERIAL NUMBER: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";

            pp = sprintf("%-12.12s %18.18s", "MERCHANT ID:", records[id].merchant_id);
            print += "<p align=\"left\">MERCHANT ID: <span style=\"float:right;\">" + records[id].merchant_id + "</span></br></p>";
            
            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            var v = setResponseCode(records[id].response_code);
            pp = sprintf("   %*s%*s   ", 12 + getMod(v).length / 2, 
                getMod(v), 
                12 - getMod(v).length / 2, "");
            print += "<p style=\"text-align: center;\">" + v.toUpperCase() + "</br></p>";
            
            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            pp = sprintf("%-12.12s %18.18s", "TRANSACTION:", getTransactionType(records[id].mti, records[id].processing_code));
            print += "<p align=\"left\">TRANSACTION: <span style=\"float:right;\">" + getTransactionType(records[id].mti, records[id].processing_code) + "</span></br></p>";
            
            pp = sprintf("%-14.14s %16.16s", "RESPONSE CODE:", records[id].response_code);
            print += "<p align=\"left\">RESPONSE CODE: <span style=\"float:right;\">" + records[id].response_code + "</span></br></p>";

            pp = sprintf("%-10.10s %20.20s", "AUTH CODE:", records[id].auth_code);
            print += "<p align=\"left\">AUTH CODE: <span style=\"float:right;\">" + records[id].auth_code + "</span></br></p>";

            if(stan.length < 6)
            {
                pp = sprintf("%-5.5s %25.25s", "STAN:", records[id].stan);
                print += "<p align=\"left\">STAN: <span style=\"float:right;\">" + records[id].stan + "</span></br></p>";
            }else
            {
                pp = sprintf("%-5.5s %25.25s", "STAN:", stan);
                print += "<p align=\"left\">STAN: <span style=\"float:right;\">" + stan + "</span></br></p>";
            }

            if(rrn.length < 12)
            {
                pp = sprintf("%-4.4s %26.26s", "RRN:", records[id].rrn);
                print += "<p align=\"left\">RRN: <span style=\"float:right;\">" + records[id].rrn + "</span></br></p>";
            }else
            {
                pp = sprintf("%-4.4s %26.26s", "RRN:", rrn);
                print += "<p align=\"left\">RRN: <span style=\"float:right;\">" + rrn + "</span></br></p>";
            }

            pp = sprintf("%-12.12s %18.18s", dt.slice(0, 10), dt.slice(11));
            print += "<p align=\"left\">" + dt.slice(0, 10) + " <span style=\"float:right;\">" + dt.slice(11) + "</span></br></p>";
            

            var amt = records[id].amount;
            var t = parseFloat(amt);
            var famt = "NGN " + (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            pp = sprintf("%-6.6s %24.24s", "TOTAL:", famt);
            print += "<p align=\"left\">TOTAL: <span style=\"float:right;\">" + famt + "</span></br></p>";

            
            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            pp = sprintf("%-4.4s %26.26s", "PAN:", records[id].masked_pan);
            print += "<p align=\"left\">PAN: <span style=\"float:right;\">" + records[id].masked_pan + "</span></br></p>";
            
            pp = sprintf("%-12.12s %18.18s", "EXPIRY DATE:", "**/**");
            print += "<p align=\"left\">EXPIRY DATE: <span style=\"float:right;\">" + "**/**" + "</span></br></p>";
            
            if(records[id].masked_pan === "000000******0000")
            {
                var d = "CASH";
                pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
                    12 - d.length / 2, "");
                print += "<p style=\"text-align: center;\">" + d + "</p>";
            }else
            {
                pp = sprintf("%-20.20s %10.10s", "VERIFICATION METHOD:", "PIN");
                print += "<p align=\"left\">VERIFICATION METHOD: <span style=\"float:right;\">" + "PIN" + "</span></br></p>";
            }

            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            pp = sprintf("%-15.15s %15.15s", "PRINTER NUMBER:", "****");
            print += "<p align=\"left\">PRINTER NUMBER: <span style=\"float:right;\">" + "****" + "</span></br></p>";
            
            //pp = sprintf("%-8.8s %22.22s", "VERSION:", tids[index].initapplicationversion);
            //print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + tids[index].initapplicationversion + "</span></br></p>";
            
            pp = sprintf("%-8.8s %22.22s", "VERSION:", "NOT STORED");
            print += "<p align=\"left\">VERSION: <span style=\"float:right;\">" + "NOT STORED" + "</span></br></p>";
            
            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            var d = "PTSP: BizzdeskGroup ";
            pp = sprintf("   %*s%*s   ", 12 + d.length / 2, d, 
                12 - d.length / 2, "");
            print += "<p style=\"text-align: center;\">" + d + "</p>";
            
            pp = sprintf("   %*s%*s   ", 12 + "Powerred by ETOP. ".length / 2, "Powerred by ETOP. ", 
                12 - "Powerred by ETOP. ".length / 2, "");
            print += "<p style=\"text-align: center;\">" + "Powerred by ETOP. " + "</p>";
            
            pp = sprintf("   %*s%*s   ", 12 + "tms COPY. ".length / 2, "tms COPY. ", 
                12 - "tms COPY. ".length / 2, "");
            print += "<p style=\"text-align: center;\">" + "tms COPY. " + "</p>";

            if(records[id].extras)
            {
                print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
                print += "<p style=\"text-align: center;\">" + "PAYMENT DETAILS" + "</p>";
                print += "<p style=\"text-align: center;\">" + "=============================</br>" + "</p>";
                var store = "";
                for(var m = 0; m < records[id].extras.length; m++)
                {
                    if(records[id].extras.charAt(m) === '.')
                        store = store + "</br>";
                    else if(records[id].extras.charAt(m) === '=')
                        store = store + ": ";
                    else
                        store = store + records[id].extras.charAt(m);
                    
                }
                print += "<p style=\"text-align: center;\">" + store + "</p>";
            }

            pp = "\n..............................";
            print += "<p style=\"text-align: center;\">" + ".....................................................................</br>" + "</p>";
            
            print += "</div>";
            swal({
                title: 'REPRINT',
                text: "LOVE",
                html: print,
                type: "success",
                customClass: 'swal-wide',
                showCancelButton: false,
                showConfirmButton:true
            });

            var printWindow = window.open();
            printWindow.document.open('text/plain')
            
            printWindow.document.write(document.getElementById('div_print').innerHTML);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
		}else
        {

        }
    });


    
}

$("#charge").click(function(e){
    var use = "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Masked Pan</label>";
    use += "<input id=\"maskedpan\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"20\" value=\"\" placeholder=\"Masked Pan\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">Start Date</label>";
    use += "<input id=\"startdate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    use += "<div class=\"form-group\">"
    use += "<label for=\"cc-payment\" class=\"control-label mb-1\" style=\"float:left;\">End Date</label>";
    use += "<input id=\"enddate\" name=\"cc-payment\" type=\"text\" class=\"form-control\" aria-required=\"true\" aria-invalid=\"false\" maxlength=\"50\" value=\"\" placeholder=\"YYYY-MM-DD\">";
    use += "</div>"

    swal({
        title: 'Query',
        html: use,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#800080',
        cancelButtonColor: '#001e33',
        confirmButtonText: 'Query'
    }).then(function (result) {
        if (result.value) 
        {
            var maskedpan = $("#maskedpan").val();
            var sd = $("#startdate").val();
            var ed = $("#enddate").val();
            if(1)
            {
                $('#charge').html('Loading...');
                $('#charge').prop("disabled", true);
                if(role !== "user")
                {
                    return;
                }else
                {
                    var fd = new FormData();
                    fd.append('maskedpan', maskedpan);
                    fd.append('sd', sd);
                    fd.append('ed', ed);
                    $.ajax({
                        type: "POST",
                        url: "/tms/transaction/chargeback",
                        data : fd,
                        processData: false,
                        contentType: false,

                        success: function (data) {
                            //Here
                            //console.log(data);
                            records = JSON.parse(data);
                            //console.log(records[0]);
                            var value = "";
                            if(records.length < 1)
                            {
                                var table = $('#bootstrap-data-table').DataTable({
                                        "language": {
                                            "emptyTable": "No Records Found"
                                        },
                                        "bDestroy": true
                                });
                                table.clear().draw();
                                $("#charge").text("Chargeback");
                                $("#charge").prop("disabled",false);
                                return;
                            }
                            
                            for (var i = 0; i < records.length; i++) 
                            {
                                arr = [];
                                arr.push(records[i].terminal_id);
                                arr.push(setResponseCode(records[i].response_code));
                                arr.push(records[i].masked_pan);
                                if(records[i].auth_code) 
                                    arr.push(records[i].auth_code);
                                else
                                    arr.push("NA");
                                var amt = records[i].amount;
                                var t = parseFloat(amt);
                                var famt = (t).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                arr.push("NGN " + famt);
                                arr.push(records[i].extras);
                                arr.push(records[i].tap);
                                var datetime = records[i].date_trans;
                                var dt = "";
                                if(datetime.length == 14)
                                    dt = formatDt(datetime);
                                else
                                    dt = datetime;
                                arr.push(dt);
        
                                arr.push(records[i].paymentmethod);
        
                                //arr.push("<button onclick=\"gotoView('" + i + "');\" type=\"button\" class=\"btn btn-success\">View</button>" +
                                //"<button onclick=\"gotoPrint('" + i + "');\" type=\"button\" class=\"btn btn-success\">Print</button>");

                                arr.push("<button onclick=\"modifyreceipt('" + i + "');\" type=\"button\" class=\"btn btn-success\">Modify</button>");

                                if(checkPlease(records[i].terminal_id) === false)
                                {
                                    //console.log("Nothing found")
                                    continue;
                                }
                                $('#bootstrap-data-table').DataTable().row.add(arr);
                            }
                            $('#bootstrap-data-table').DataTable().draw();
                            $("#charge").text("Chargeback");
                            $("#charge").prop("disabled",false);
                        },
                        error : function(xhr,errmsg,err) {
                            $("#charge").text("Chargeback");
                            $("#charge").prop("disabled",false);
                            var table = $('#bootstrap-data-table').DataTable({
                                    "language": {
                                        "emptyTable": "Please Reload Page."
                                    },
                                    "bDestroy": true
                            });
                            table.clear().draw();
                        }
                    });
                }
            }
		}else
        {

        }
    });
    $("#charge").text("Chargeback");
    $("#charge").prop("disabled",false);
});


function getAllTerminals()
{
    $.ajax({
        type: "GET",
        url : "/tms/transaction/getalltids",
        processData: false,
        contentType: false,

        success : function(json) {
            tids = JSON.parse(json.message);
        },

        complete: function(){
            
        },
        
        error : function(xhr,errmsg,err) {
            console.log(xhr.responseText);
        }
    });
}

$(document).ready(function() {
    $("#tmsform").hide();
    var x = document.getElementById("details").innerText;
    details = JSON.parse(x);
    $("#fullname").text(details.fullname);
    role = details.role;
    username = details.username;
    //getAllTerminals();
});
