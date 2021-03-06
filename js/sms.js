var xmlContent;
$(document).ready(function() {	
	$(document).on('dragenter', '#dropfile', function() {
            $(this).css('border', '3px dashed red');
            return false;
	});
	 
	$(document).on('dragover', '#dropfile', function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed red');
				return false;
	});
	 
	$(document).on('dragleave', '#dropfile', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed #BBBBBB');
				return false;
	});
	$(document).on('drop', '#dropfile', function(e) {
		if(e.originalEvent.dataTransfer){
			if(e.originalEvent.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed green');
				upload(e.originalEvent.dataTransfer.files);
			}  
		}
		else {
				   $(this).css('border', '3px dashed #BBBBBB');
		}
		return false;
	});
});
function deduplicateSMS(xmlSource) {
	var ids = new Array();
	var duplicates= 0;
	var total= 0;
	
	$(xmlSource).find('allsms sms').each(function(index,e) {
		if (ids.indexOf($(this).attr('address')+$(this).attr('date'))==-1) {
			total+=1;
			ids.push($(this).attr('address')+$(this).attr('date'));
		} else {
			
			duplicates+=1;
			$(this).remove();
		}
	});
	$(xmlSource).find('allsms').attr('count',total);
	var blob = new Blob([XMLToString(xmlSource)], {type: "text/xml;charset=utf-8"});
	saveAs(blob, "sms.xml");
}
/* Source : http://www.maximechaillou.com/simple-upload-en-drag-and-drop-avec-html5-jquery-php/ */
function upload(files) {
	var f = files[0] ;
	var reader = new FileReader();

	//The handleReaderLoad is used as a listener on onload event, to be fired at the end of the file upload
	reader.onload = handleReaderLoad;

	// Read in the image file as a text
	reader.readAsText(f);            
}
function handleReaderLoad(evt) {
	var xml = evt.target.result
	deduplicateSMS($.parseXML(xml));
}

/* Source : http://www.dotnet-tricks.com/Tutorial/javascript/Y7Q9130612-Convert-string-to-xml-and-xml-to-string-using-javascript.html*/
function XMLToString(oXML)
{
	 //code for IE
	 if (window.ActiveXObject) {
	 var oString = oXML.xml; return oString;
	 } 
	 // code for Chrome, Safari, Firefox, Opera, etc.
	 else {
		
	 return (new XMLSerializer()).serializeToString(oXML);
	 }
 }