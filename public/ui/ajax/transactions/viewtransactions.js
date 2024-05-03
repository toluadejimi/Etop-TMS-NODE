
var startdate = "";
var enddate = "";

function getMonth(mnth)
{
  if(mnth.indexOf("Jan") !== -1)
  {
    return "01";
  }else if(mnth.indexOf("Feb") !== -1)
  {
    return "02";
  }else if(mnth.indexOf("Mar") !== -1)
  {
    return "03";
  }else if(mnth.indexOf("Apr") !== -1)
  {
    return "04";
  }else if(mnth.indexOf("May") !== -1)
  {
    return "05";
  }else if(mnth.indexOf("Jun") !== -1)
  {
    return "06";
  }else if(mnth.indexOf("Jul") !== -1)
  {
    return "07";
  }else if(mnth.indexOf("Aug") !== -1)
  {
    return "08";
  }else if(mnth.indexOf("Sep") !== -1)
  {
    return "09";
  }else if(mnth.indexOf("Oct") !== -1)
  {
    return "10";
  }else if(mnth.indexOf("Nov") !== -1)
  {
    return "11";
  }else if(mnth.indexOf("Dec") !== -1)
  {
    return "12";
  }else
  {
    return "01";
  }
}

function addHoursToDate(date, hours) {
	var dateString = date.replace("T", " ");
	var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	var dateArray = reggie.exec(dateString); 
	var dateObject = new Date(
		(+dateArray[1]),
		(+dateArray[2])-1, // Careful, month starts at 0!
		(+dateArray[3]),
		(+dateArray[4]),
		(+dateArray[5]),
		(+dateArray[6])
	);
  return new Date(dateObject.setHours(dateObject.getHours() + hours));
}

function formatRRN(timestamp){
	return addHoursToDate(timestamp, 1);
}


function getDay(day)
{
    if(parseInt(day) < 10)
        return "0" + parseInt(day);
    return day;
}

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

function calculateDateRange()
{
    var str = $("#Select_date").text();
    if(str.indexOf("-") !== -1)
    {
        var chr = str.indexOf(" - ");
        var year = new Date().getFullYear();
        var realDate = $("#Select_date").text();
        var month = getMonth(realDate.slice(0, 3));
        var day = getDay(realDate.slice(4, chr));
        startdate = year + "-" + month + "-" + day;
        month = getMonth(realDate.slice(chr + 3, chr + 3 + 3));
        day = getDay(realDate.slice(chr + 3 + 4));
        enddate = year + "-" + month + "-" + day;
    }else
    {
        var year = new Date().getFullYear();
        var realDate = $("#Select_date").text();
        var month = getMonth(realDate.slice(0, 3));
        var day = getDay(realDate.slice(4));
        startdate = year + "-" + month + "-" + day;
        enddate = startdate;
    }
    
    // console.log(startdate);
    // console.log(enddate);
    
    var table = $('#datatable-buttons').DataTable({
        "language": {
            "emptyTable": "No Records"
        },
        "bDestroy": true
    });

    table.destroy();

    var table = $('#datatable-buttons').DataTable( {
        "scrollX": true,
	"order": [[ 3, "desc" ]],
         "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            // Bind click event
            $(nRow).click(function() {
                displayParticularData(aData);
            });
            return nRow;
        },
        dom: 'Bfrltip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "ajax": {
            "url": "/tms/transaction/getalltransaction/" + startdate + "/" + enddate,
            "dataSrc": "",
        },
        "columns": [
            { "data": "id" },
            { "data": "walletid" },
            { "data": "username" },
            { "data": "tid" },
            { "data": "rrn" },
            { "data": "amount" },
            { "data": "status" },
            {
              "data": null,
              "render": function ( data, type, row, meta ) {
                return setResponseCode(row.response); }
            },
            { "data": "state" },
            { "data": "transname" },
            { "data": "pan" },
            { "data": "destination" },
            { "data": "busname" },
            { "data": "category" },
            { "data": "city" },
            { "data": "expirydate" },
            { "data": "fee" },
            { "data": "tmsamount" },
            { "data": "ptsp" },
            { "data": "tmo" },
			{
              "data": null,
              "render": function ( data, type, row, meta ) {
                return formatRRN(row.timestamp); }
            }
        ]
    });

}

function displayParticularData(data)
{
    console.log(data);
    var resp = "";
    var use = "<p align=\"left\">";
    for (var key in data) {
		if(key === "timestamp"){
			use += key.toUpperCase() 
            + ": <span style=\"float:right;\">" 
            + formatRRN(data[key]) + "</span></br>";
		}else if(key === "response")
        {
          console.log(data[key]);
          resp = data[key];
        }else
        {
          use += key.toUpperCase() 
              + ": <span style=\"float:right;\">" 
              + data[key] + "</span></br>";
        }
    }
    use += "Response" 
              + ": <span style=\"float:right;\"><h3>" 
              + resp + "</h3></span></br>";
    use += "</p>";
    swal("Transaction Details!", use, "success");
}

$("#table_refresh a").click(function () {
    calculateDateRange();
});

$(document).ready(function() {
    calculateDateRange();
});
