$(function() {
    $("#bootstrap").load("bootstrapimport.html");
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});

function getInfoList() {
  var infoForms = localStorage.getItem("infoList");
  if(infoForms) {
      return JSON.parse(infoForms).values;
  }
  else {
      return [];
  }
};

function setInfoList(infoList) {
  const obj = {
      values:infoList
  };
  localStorage.setItem("infoList", JSON.stringify(obj));
};

function getIndexOfList(sr, infoList) {
  var index=-1;
  for(var i = 0 ;i < infoList.length ; i++) {
      if(infoList[i].sr == sr) {
          index=i;
          break;
      }
  }
  return index;
}

function expiry(){
  const today = new Date();
  const dateString = today.toISOString().substr(0, 10); 
   var vacation=document.getElementById("vacation").value;
   var issuedDate=document.getElementById("issuedDate").value=dateString;
  var nextIssuanceDate = new Date(issuedDate);
      if (vacation === "Monthly" || vacation === "monthly") {
        nextIssuanceDate.setMonth(nextIssuanceDate.getMonth() + 1);
      } else if (vacation === "Quarterly" || vacation === "quarterly") {
        nextIssuanceDate.setMonth(nextIssuanceDate.getMonth() + 3);
      } else if (vacation === "Yearly" || vacation === "yearly") {
        nextIssuanceDate.setFullYear(nextIssuanceDate.getFullYear() + 1);
      }
      
      // Add the next issuance date to the info object
      expiredDate = nextIssuanceDate.toISOString().slice(0,10);

      document.getElementById("expiryDate").value=expiredDate;
      console.log(expiredDate);
}

function createInfo(){
  var sr = document.getElementById("srNo").value;
  var name = document.getElementById("name").value;
  var department = document.getElementById("dept").value;
  var year = document.querySelector('input[name="Year"]:checked').value;
  var gender = document.querySelector('input[name="Gender"]:checked').value;
  var division = document.getElementById("division").value;
  var vacation = document.getElementById("vacation").value;
  var className = document.querySelector(`input[name="Class"]:checked`).value;
  var source = document.getElementById("source").value;
  var destination = document.getElementById("destination").value;
  var issuedDate = document.getElementById("issuedDate").value;
  var expiredDate = document.getElementById("expiryDate").value;
  var voucher = document.getElementById("voucher-no").value;
  var issuedStatus = "Pending";
  
  const info = {
      sr:sr,
      name:name,
      department:department,
      year:year,
      gender:gender,
      division:division,
      vacation:vacation,
      className:className,
      source:source,
      destination:destination,
      issuedDate:issuedDate,
      expiredDate:expiredDate,
      voucher:voucher,
      status:issuedStatus
  };

  var infoList = getInfoList();
  console.log(infoList);
  console.log(typeof infoList);

  var index = getIndexOfList(info.sr , infoList);
  if(index > -1) {
      alert(`Form:${info.sr} is already present`);
  }
  else{
        infoList.unshift(info);
        setInfoList(infoList);
        alert(`Form: ${info.sr} created Succesfully`);
        submitForm();
        let currentSrNo = localStorage.getItem('srNo');
        if(info.sr==currentSrNo){
        localStorage.setItem('srNo', parseInt(currentSrNo) + 1);
        }
        else{
        localStorage.setItem('srNo', parseInt(currentSrNo));
        }
        document.getElementById("form").reset();
  }
}



function getAllFormsForUpdate(){
  var allInfo = getInfoList();
  var tbody = document.getElementById("tbody");
  var notFound = document.getElementById("not-found");
  notFound.innerHTML = ``;
  if(allInfo.length == 0) {
      notFound.innerHTML = `<div style="color :red; align-conent=centre;">No Records Found</div>`;
  }
  tbody.innerHTML = ``;
  for(var info of allInfo) {
      var row = document.createElement("tr");
      row.innerHTML = `
      <td>${info.sr}</td>
      <td>${info.issuedDate}</td>
      
      <td>${info.source}</td>
      <td>${info.destination}</td>
      <td>${info.className}</td>
      <td>${info.vacation}</td>
      <td>${info.status}</td>
      <td>
            <button id="update-btn" onclick="showUpdate(${info.sr})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary" ${info.status === "Accepted" ? "disabled" : ""}>Update</button>
        </td>
      `;
      tbody.appendChild(row);
  }
}


function showUpdate(sr) {
  var allForms = getInfoList();
  var index = getIndexOfList(sr , allForms);
  if(index == -1) {
      document.getElementById("srNo").value="";
      document.getElementById("Date-of-issue").value="";
      document.getElementById("source").value="";
      document.getElementById("destination").value="";
      document.getElementById("class").value="";
      document.getElementById("name").value="";
      document.getElementById("vacation").value="";
      document.getElementById("year").value="";
      document.getElementById("voucher-no").value="";
      document.getElementById("gender").value="";
      document.getElementById("division").value="";
      // document.getElementById("division").value="";
      // document.getElementById("Status").value="";
      alert("Form not found");
  } else {
      var info = allForms[index];
      document.getElementById("srNo").value=info.sr;
      document.getElementById("Date-of-issue").value=info.issuedDate;
      document.getElementById("source").value=info.source;
      document.getElementById("destination").value=info.destination;
      document.getElementById("class").value=info.className;
      document.getElementById("vacation").value=info.vacation;
      document.getElementById("name").value=info.name;
      document.getElementById("dept").value=info.department;
      document.getElementById("year").value=info.year;
      document.getElementById("gender").value=info.gender;
      document.getElementById("division").value=info.division;
      document.getElementById("voucher-no").value=info.voucher;
      // document.getElementById("preview").src=order.image;
  }
}

function updateForm() {
  var sr = document.getElementById("srNo").value;
  var name = document.getElementById("name").value;
  var department = document.getElementById("dept").value;
  var year = document.getElementById("year").value;
  var gender = document.getElementById("gender").value;
  var division = document.getElementById("division").value;
  var vacation = document.getElementById("vacation").value;
  var className = document.getElementById("class").value;
  var source = document.getElementById("source").value;
  var destination = document.getElementById("destination").value;
  var issuedDate = document.getElementById("Date-of-issue").value;
//   var expiredDate = document.getElementById("Date-of-expiry").value;
  var voucher = document.getElementById("voucher-no").value;
  var issuedStatus = "Pending";
  
  const info = {
      sr :sr,
      name:name,
      department:department,
      year:year,
      division:division,
      vacation:vacation,
      gender:gender,
      className:className,
      source:source,
      destination:destination,
      issuedDate:issuedDate,
    //   expiredDate:expiredDate,
      voucher:voucher,
      status: issuedStatus
  };
  console.log(info.status);
  var infoList = getInfoList();
  console.log(infoList);
  console.log(typeof infoList);
  var index = getIndexOfList(info.sr , infoList);
  if(index == -1) {
      alert(`Form: ${info.sr} not found`);
      return;
  }
  infoList[index]=info;
  setInfoList(infoList);
  document.getElementById("close").click();
  alert(`Form: ${info.sr} created Succesfully`);
  getAllFormsForUpdate();
}


function getAllFormsForDelete(){
  var infoList = getInfoList();
  console.log(infoList);
  var tbody = document.getElementById("tbody");
  var notFound = document.getElementById("not-found");
  notFound.innerHTML = ``;
  if(infoList.length == 0) {
      notFound.innerHTML = `<div style="color :red; align-conent=centre;">No Record Found</div>`;
  }
  tbody.innerHTML = ``;
  for(var info of infoList) {
      var row = document.createElement("tr");
      row.innerHTML = `
      <td>${info.sr}</td>
      <td>${info.issuedDate}</td>
      
      <td>${info.source}</td>
      <td>${info.destination}</td>
      <td>${info.className}</td>
      <td>${info.vacation}</td>
      <td>${info.status}</td>
      <td>
            <button id="delete-btn" onclick="deleteForm(${info.sr})" class="btn btn-primary" ${info.status === "Accepted" ? "disabled" : ""}>Delete</button>
        </td>
      `;
      tbody.appendChild(row);
  }

}

function deleteForm(sr) {
  console.log(sr);
  var x = confirm("Are you sure?");
        if(!x) {
            return ;
        }
  //local storage should be updated
  //refresh data and show no items found
  // var btn = document.getElementById("delete-btn");
  var allOrdersA = getInfoList();
  console.log(allOrdersA);
  var index = getIndexOfList(sr , allOrdersA);
  console.log(index);
  if(index == -1) {
      alert("Form not found");
  }
  else {
        allOrdersA.splice(index , 1);
        setInfoList(allOrdersA); // Convert array to string before storing in local storage
        alert(`Form:${sr} deleted Succesfully`);
        getAllFormsForDelete();
      }
}

//D:\Final mini proj\Mini Project\Files

function deleteForm(sr) {
  console.log(sr);
  var x = confirm("Are you sure?");
        if(!x) {
            return ;
        }
  //local storage should be updated
  //refresh data and show no items found
  var btn = document.getElementById("delete-btn");
  var allOrdersA = getInfoList();
  console.log(allOrdersA);
  var index = getIndexOfList(sr , allOrdersA);
  console.log(index);
  if(index == -1) {
      alert("Form not found");
  }
  else {
        allOrdersA.splice(index , 1);
        setInfoList(allOrdersA);
        alert(`Form:${sr} deleted Succesfully`);
        getAllFormsForDelete();
      }
}
  

function getAllForms(){
  var infoList = getInfoList();
  console.log(infoList);
  var tbody = document.getElementById("tbody");
  var notFound = document.getElementById("not-found");
  notFound.innerHTML = ``;
  if(infoList.length == 0) {
      notFound.innerHTML = `<div style="color :red; align-conent=centre;">No Record Found</div>`;
  }
  tbody.innerHTML = ``;
  for(var info of infoList) {
      var row = document.createElement("tr");
      row.innerHTML = `
      <td>${info.sr}</td>
      <td>${info.issuedDate}</td>
      
      <td>${info.source}</td>
      <td>${info.destination}</td>
      <td>${info.className}</td>
      <td>${info.vacation}</td>
      <td>${info.status}</td>
      <td>
      <button id="download-btn" class="btn btn-success" onclick="pdf(${info.sr})" ${(info.status === "Rejected" || info.status=== "Pending" ? "disabled" : "")}>Download</button>
      </td>
      `;
      tbody.appendChild(row);
      
  }

}

function pdf(sr){
  // window.location.href="pdf.html";
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  


  var allInfo = getInfoList();
 
 var makepdf = document.getElementById("generate")

  
  // var notFound = document.getElementById("not-found");
  // notFound.innerHTML = ``;
  if(allInfo == 0) {
      makepdf.innerHTML = `<div style="color :red; align-content=centre;">No Record Found</div>`;
  }
  // makepdf.innerHTML = ``;
  
  for(var info of allInfo) {
      // var data = document.createElement("div")
      if(sr == info.sr && !info.voucher){
      makepdf.innerHTML = `
      <div style="font-size:13px;">
      <div style="margin-left: 200px;">
      Nearest station </div>
        <br>
      भारतीय रेल
      <br>
      INDIAN RAILWAYS
      <br>
      <div style="margin-left:300px;">
      क्र.सं./Sr. No. ${info.sr}
      <br>
        
      </div>
      <div style="margin-left:400px;">
      एसएन 99वी/SN99B
       1298736
       <br>
      P.L.No. 83055836
      </div>
  
    <p> विद्यालय प्रमाण पत्र सिर्फ उन् छात्रों के लिए जिनकी आयु 25 वर्ष तक है अन्यथा जिन्हें नियमानुसार अनुज्ञा मिली हो ।  School certificate to the students only to those not more than 25 years  of age except otherwise permitted under the Rules
        <br>
    मैं एतद्द्वारा प्रमाणित करता हूं कि * ________इस विद्यालय/ महाविद्यालय में जिसका में, जिसका मैं  प्राचार्य/प्रधानाध्यापक हूँ जो विद्यालय में नियमित रूप से आता/आती है और मेरे विश्वास तथा मेरे द्वारा की गयी जांच के आधार पर आज उसकी आयु ___ वर्ष____माँस है , विद्यालय/महाविद्यालय  के रजिस्टर में दर्ज उसको जन्म तिथि ____ है। 
    <br>
    I hereby certify that * <u>${info.name}</u> regularly attends this School College for the purpose of receiving education, the Institution of which I am the Principal/Head Master and his/her age this day, according to my belief and from enquiries I have made, is __ years, months his/her date of birth as entered in the School College Register being ______ .He/She is therefore, entitled to the Season Ticket as detailed below at half the full rates charged for Adults.
    </p>
    <div>
    <table style="border: 1px solid black;
    padding: 0.4rem;">
        <tr style="border: 1px solid black;
        padding: 0.4rem;">
            <th style="border: 1px solid black;
    padding: 0.4rem;">Class</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">Period</t>
            <th style="border: 1px solid black;
    padding: 0.4rem;">From</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">To station</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">Class and No. of Season Ticket issued</th>
        </tr>
        <tr>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.className}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.vacation}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.source}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.destination}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;"></th>
        </tr>
    </table>
    <div>
        
@ विद्यार्थी के पास इस समय / The student at present holds ___श्रेणी/ Class का सीजन टिकट नंबर / Season Ticket No ______ From _____ से / To _______ तक है, जो की अर्ध-वार्षिक/त्रैमासिक/मासिक है For the half year/Quarter/Month ending ______ और जिसकी अवधि ______ को समाप्त होती ह। 
<br> 
दिनांक/ Date <u>${today}</u>
<br>
महाविद्यालय/विद्यालय का नाम और मुहर _________
Name of College/School and Stamp.
<br>
* विद्यार्थी का पूरा नाम लिखे / Enter the name of the student 
<br>
 + विद्यार्थी के निवास स्थान के निकटतम स्टेशन और विद्यालय/ महाविद्यालय के निकटतम स्टेशन के बीच उपलब्ध / Available only between Station nearest to Student's residence and Station nearest to the College/School
 <br> 
# सीजन टिकट जारी करनेवाले स्टेशन द्वारा भरा जाय / This column should be filled in by the Station issuing the Season Ticket.
<br>
@ यदि पहले सीजन टिकट न रहा  हो तो "कुछ नहीं" शब्द लिख दिया जाना चाहिए / If no Season Ticket is held the word 'NIL' should be inserted.
<br>
Note :- (1) यह प्रमाण-पत्र जारी करने के दिन सहित तीन दिनों तक ही वैध होगा। यदि इस अवधि में इसका उपयोग न किया जाए तो रद्द करने के लिए इसे जारी करनेवाले को लोटा दिया जाना चाहिए /This certificate will be valid for Three days including the date of issue and if not made use of within that time must be returned by the issued for cancellation.
<br>
(2) विद्यालय/ महाविद्यालय के प्राधिकारी को अपने उस छात्र / छात्रा की जिसका सीजन टिकट पिछले प्रमाणपत्र की उल्लिखित अवधि में खो गया हो नया रियायती प्रमाणपत्र जारी नहीं करना चाहिए। ऐसे छात्र/छात्राओं को उस अवधि का पूरा टेरिफ किराया देकर नया सीजन टिकट खरीदना होगा। 
<br>
No fresh concession certificate should be granted by the School/College authorities to any of their students in the event of his/her season ticket being lost during the carency of the previous certificate. Such students must purchase a fresh season ticket of tariff fares during that period.
C.R.P.P./By/11-2019/01-19-0018-35000Bks.x50Lvs.

    </div>
      </div>
      `;
      // makepdf.appendChild(data);
      var mywindow = window.open("", "PRINT", "height=600,width=600");
      mywindow.document.write(makepdf.innerHTML);
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      // window.print();
      return true;
      }
      
  
  // printPDF(makepdf);

  
  else {
      if(sr == info.sr){
      makepdf.innerHTML = `
      <div style="font-size:13px;">
      <div style="margin-left: 200px;">
      Nearest station </div>
        <br>
      भारतीय रेल
      <br>
      INDIAN RAILWAYS
      <br>
      <div style="margin-left:300px;">
      क्र.सं./Sr. No. ${info.sr}
      <br>
        
      </div>
      <div style="margin-left:400px;">
      एसएन 99वी/SN99B
       1298736
       <br>
      P.L.No. 83055836
      </div>
  
    <p> विद्यालय प्रमाण पत्र सिर्फ उन् छात्रों के लिए जिनकी आयु 25 वर्ष तक है अन्यथा जिन्हें नियमानुसार अनुज्ञा मिली हो ।  School certificate to the students only to those not more than 25 years  of age except otherwise permitted under the Rules
        <br>
    मैं एतद्द्वारा प्रमाणित करता हूं कि * ________इस विद्यालय/ महाविद्यालय में जिसका में, जिसका मैं  प्राचार्य/प्रधानाध्यापक हूँ जो विद्यालय में नियमित रूप से आता/आती है और मेरे विश्वास तथा मेरे द्वारा की गयी जांच के आधार पर आज उसकी आयु ___ वर्ष____माँस है , विद्यालय/महाविद्यालय  के रजिस्टर में दर्ज उसको जन्म तिथि ____ है। 
    <br>
    I hereby certify that * <u>${info.name}</u> regularly attends this School College for the purpose of receiving education, the Institution of which I am the Principal/Head Master and his/her age this day, according to my belief and from enquiries I have made, is __ years, months his/her date of birth as entered in the School College Register being ______ .He/She is therefore, entitled to the Season Ticket as detailed below at half the full rates charged for Adults.
    </p>
    <div>
    <table style="border: 1px solid black;
    padding: 0.4rem;">
        <tr style="border: 1px solid black;
        padding: 0.4rem;">
            <th style="border: 1px solid black;
    padding: 0.4rem;">Class</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">Period</t>
            <th style="border: 1px solid black;
    padding: 0.4rem;">From</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">To station</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">Class and No. of Season Ticket issued</th>
        </tr>
        <tr>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.className}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.vacation}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.source}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;">${info.destination}</th>
            <th style="border: 1px solid black;
    padding: 0.4rem;"></th>
        </tr>
    </table>
    <div>
        
@ विद्यार्थी के पास इस समय / The student at present holds <u>${info.className}</u> श्रेणी/ Class का सीजन टिकट नंबर / Season Ticket No <u>${info.voucher}</u> From <u>${info.source}</u> से / To <u>${info.destination}</u> तक है, जो की अर्ध-वार्षिक/त्रैमासिक/मासिक है For the half year/Quarter/Month ending ${info.vacation} और जिसकी अवधि <u>${info.expiredDate}</u> को समाप्त होती ह। 
<br> 
दिनांक/ Date ${today}.
<br>
महाविद्यालय/विद्यालय का नाम और मुहर ________
Name of College/School and Stamp.
<br>
* विद्यार्थी का पूरा नाम लिखे / Enter the name of the student 
<br>
 + विद्यार्थी के निवास स्थान के निकटतम स्टेशन और विद्यालय/ महाविद्यालय के निकटतम स्टेशन के बीच उपलब्ध / Available only between Station nearest to Student's residence and Station nearest to the College/School
 <br> 
# सीजन टिकट जारी करनेवाले स्टेशन द्वारा भरा जाय / This column should be filled in by the Station issuing the Season Ticket.
<br>
@ यदि पहले सीजन टिकट न रहा  हो तो "कुछ नहीं" शब्द लिख दिया जाना चाहिए / If no Season Ticket is held the word 'NIL' should be inserted.
<br>
Note :- (1) यह प्रमाण-पत्र जारी करने के दिन सहित तीन दिनों तक ही वैध होगा। यदि इस अवधि में इसका उपयोग न किया जाए तो रद्द करने के लिए इसे जारी करनेवाले को लोटा दिया जाना चाहिए /This certificate will be valid for Three days including the date of issue and if not made use of within that time must be returned by the issued for cancellation.
<br>
(2) विद्यालय/ महाविद्यालय के प्राधिकारी को अपने उस छात्र / छात्रा की जिसका सीजन टिकट पिछले प्रमाणपत्र की उल्लिखित अवधि में खो गया हो नया रियायती प्रमाणपत्र जारी नहीं करना चाहिए। ऐसे छात्र/छात्राओं को उस अवधि का पूरा टेरिफ किराया देकर नया सीजन टिकट खरीदना होगा। 
<br>
No fresh concession certificate should be granted by the School/College authorities to any of their students in the event of his/her season ticket being lost during the carency of the previous certificate. Such students must purchase a fresh season ticket of tariff fares during that period.
C.R.P.P./By/11-2019/01-19-0018-35000Bks.x50Lvs.

    </div>
      </div>
      `;
      // makepdf.appendChild(data);
      var mywindow = window.open("", "PRINT", "height=600,width=600");
      mywindow.document.write(makepdf.innerHTML);
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      // window.print();
      return true;
      }
      
  };
  // printPDF(makepdf);
  }
};


function getAllFormsForAdmin(){
  var allInfo = getInfoList();
  var tbody = document.getElementById("tbody");
  var notFound = document.getElementById("not-found");
  notFound.innerHTML = ``;
  if(allInfo.length == 0) {
      notFound.innerHTML = `<div style="color :red; align-conent=centre;">No Record Found</div>`;
  }
  tbody.innerHTML = ``;
  for(var info of allInfo) {
      var row = document.createElement("tr");
      row.innerHTML = `
      <td>${info.sr}</td>
      <td>${info.division}</td>
      <td>${info.name}</td>
      <td>${info.issuedDate}</td>
      <td>${info.source}</td>
      <td>${info.destination}</td>
      <td>${info.className}</td>
      <td>${info.vacation}</td>
      <td>${info.status}</td>
      <td>
      <button id="accept-btn-${info.sr}" class="btn btn-success" onclick="acceptStatus(${info.sr})"${(info.status === 'Accepted' || info.status === 'Rejected') ? 'disabled' : ''}>Accept</button>
      <br>
      
      <button id="reject-btn-${info.sr}" class="btn btn-danger" onclick="rejectStatus(${info.sr})"${(info.status === 'Accepted' || info.status === 'Rejected') ? 'disabled' : ''}>Reject</button>
      </td>
      `;
      tbody.appendChild(row);
      
  }
}


function rejectStatus(sr){
  var infoList = getInfoList();
  console.log(sr);
  for(var i=0;i<infoList.length;i++){
    if(infoList[i].sr==sr){
      confirm(`Form: ${infoList[i].sr} will be rejected`)
      infoList[i].status="Rejected";
    }
  }

  setInfoList(infoList);
  getAllFormsForAdmin();
}

function acceptStatus(sr){
  var infoList = getInfoList();
  
  console.log(sr);
  for(var i=0;i<infoList.length;i++){
    if(infoList[i].sr==sr){
      infoList[i].status="Accepted";
    }
  }
  setInfoList(infoList);
  getAllFormsForAdmin();
}

