// JavaScript Document
var PORTAL = {};

(function($) {
    "use strict";
	
	/*  variables  */
	var $document = $(document);
    var $window = $(window);

	PORTAL.initialize = {		
      init: function() {  
	        PORTAL.initialize.fnLoginLoader(); 
	        PORTAL.initialize.fnSidebarToggle(); 			     
			PORTAL.initialize.fnSideMenuList();
			// Incident Report
			PORTAL.initialize.fnIncidentType();
			PORTAL.initialize.fnPersonAffectedInvolved()
			PORTAL.initialize.fnComments();
			PORTAL.initialize.fnAddPersonModal();
			PORTAL.initialize.fnParticipants();
			PORTAL.initialize.fnRiskAssessmentAdd();
			PORTAL.initialize.fnVisitorsList();
			PORTAL.initialize.fnRemoveFromList();
			PORTAL.initialize.fnIncidentReportMenu();            
			PORTAL.initialize.fnContributoryFactors();
			PORTAL.initialize.fnSaveIncident();
			// Search Incident Report
            PORTAL.initialize.fnSearchIncidentReportTab();
			PORTAL.initialize.fnIncidentSearch();
			PORTAL.initialize.fnSearchCollapse();
			PORTAL.initialize.fnRiskRank();              
		
	  },
	  // loader 
	  fnLoginLoader : function (){ 	     
			$document.on('click','#loginBtn', function() {
			   $('.loader-top').addClass('la-animate');	
			});
	  },
	  // toggle sidebar
	  fnSidebarToggle : function (){ 	     
			$document.on('click',"#menu-toggle",function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled");
                $
			});
			$document.on('click',"#menu-toggle-2",function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled-2");		
			   // $('#menu ul').hide();
				$(".navbar-header").toggleClass('tgl');		
			});
	  },
	  // sidemenu sublist
	  fnSideMenuList : function (){ 	     
			$('#menu ul').hide();
			$('#menu ul').children('.current').parent().show();
			  //$('#menu ul:first').show();
			  $document.on('click','#menu li a',function() {
				  var checkElement = $(this).next();          
					checkElement.slideToggle(100);            
			 });
	  },
	  	 
	  fnIncidentType : function (){ 
	  	    // incident Type 
			 			
			$document.on('change', '#incidentTypeSelect', function() {	
				if ($(this).val() == 'omaniCode')
				{
					$('#omaniCodeModal').modal({
                        backdrop: 'static',
                        keyboard: false
                    })
                   // $('.modal-backdrop').hide();
                    
                  //  setTimeout(function(){
                //        $("#omaniCodeModal").modal('toggle');
               //     }, 5000);
				}
			});	
	  },	       
        
	  fnPersonAffectedInvolved : function (){ 
			  $document.on('change', '.staffPatient', function() {
				var val = $(this).val();
				var parent = $(this).parents('.search-add-list');
				if (val == "staff") {	
                      parent.find('.other-content').hide();
                      parent.find('.type-name').show();
					  parent.find('.nameId').text('Type Person Name');
				 } else if (val == "patient") {	
                      parent.find('.other-content').hide();
                     parent.find('.type-name').show();
					 parent.find('.nameId').text('Type Patient Id');
				 } else if (val == "other") {	
                     parent.find('.other-content').show();
                     parent.find('.type-name').hide();
                 } 
                  
			  });
			  $document.on('keyup','.search',function(e){	
			  
					var addList = $(this).parents('.search-add-list');
					var val =  addList.find('.staffPatient option:selected').val();	  
					var searchField = $(this).val();
					var myExp = new RegExp(searchField, "i");
					var output = '<div class="table">';
					var count = 1;
					
					
					
					if( val == "staff" ){
					  $(this).parents('.search-add-list').find('.addList').prepend("<li><i class='fa fa-user icons'></i>John Doe | Male | 20yrs <button class='icon-btn'><i class='fa fa-close icon-red'><i></button></li>");
				   }else{
						if($(this).val() && e.keyCode == 13){	
							e.stopPropagation();			
							$(this).parents('.search-add-list').find('.addList').prepend("<li><i class='fa fa-bed icons'></i>John Doe | Male | 20yrs <button class='icon-btn'><i class='fa fa-close icon-red'><i></button></li>");
							
				   }				   
				}
					  
			});	
			$document.on('click',".value",function() {
				var addList = $(this).parents('.search-add-list');			 			
				var staffId = $(this).parent().find('.id').text();
				var staffName = $(this).parent().find('.name').text();
				var staffRole = $(this).parent().find('.role').text();			
				var addList = $(this).parents('.search-add-list'); 
				var val =  addList.find('.staffPatient option:selected').val();			  
						
				$(this).parents('.search-add-list').find('.addList').prepend("<li><i class='fa fa-user icons'></i>"+staffId+" | "+staffName+" | "+staffRole+"<button class='icon-btn'><i class='fa fa-close icon-red'><i></button></li>");	
				
				addList.find('.results').hide();				
			});
			$document.on('click', function (e) {
				if ($(e.target).closest(".results").length === 0) {
					$(".results").hide();
				}
			});	  
	  },
	  
	  fnComments : function (){ 
			$document.on('click','#commentBtn', function () {
			  var comment = $('.commentBox').val(); 
			  var d = new Date();          
			  var n = d.toLocaleString([], { hour12: true});	
			   if ($('.commentBox').val().length) {
				  $('.listComments').prepend('<li><h6>Commented By <span> Mr Abc <span>< Medical Officer In-Charge ></span></span></h6><p>'+comment+"</p><span class='time'><i class='fa fa-clock-o'></i>"+n+'</span></li>')
			  }
			});
			$document.on('click','#commentClear', function () {
				$('.commentBox').val('')
			});
	  
	  },	  
	  fnAddPersonModal : function (){ 	      
			  $document.on('click','#searchPerson', function () {			
				var val =  $('#searchPersonInput').val();
				var $select =  $('#SelectPerson').val();
								
				if(val){	
					if($select == "staff"){	
						$('.show-result').prepend('<li><div class="form-inputs"><input type="checkbox" value="1"><label><i class="fa fa-user icons"></i> 5482 | Jane Doe </label> </div></li>');
						}else{
						$('.show-result').prepend('<li><div class="form-inputs"><input type="checkbox"><label><i class="fa fa-bed icons"></i> John Doe | Male | 20yrs </label> </div></li>')
							}
					$('.show-result li').each(function(i){					    
						$('.show-result li:first').find('input').attr('id','checkbox' +(i+1));	
						$('.show-result li:first').find('label').attr('for','checkbox' +(i+1));		
					});					
				}
			});
			$document.on('click','#addPersonbtn', function () {			  		  	
			  var parent = $('.search-add-list.active');
			  var addtList =  $(this).parents('#addNewPerson').find('.show-result li ');   
			   addtList.each(function() {			   
				  var data = addtList.find('input:checked').next('label').html();
				  if ($(".show-result li input:checkbox:checked").length > 0){
					   $('.search-add-list.active').find('.searchList').prepend('<li>'+data+' <button class="icon-btn"><i class="fa fa-close icon-red"><i></i></i></button></li>');
				  }
			   });		  
			});		
			//Add person - Affected/Involved block select 
			$document.on('click','.addNewBtn', function () {	
				$(this).parents('.search-add-list').addClass('active');
			});			
			$document.on('click','.CloseAddPerson, #addNewPerson .close', function () {	
				$('.search-add-list').removeClass('active');
				$('.show-result').html('');
			});
			//Add Person modal			
			$document.on('change', '#SelectPerson', function() {
				var val = $(this).val();
				var parent = $(this).parents('.addNewbox');
				if (val == "staff") {			
					  parent.find('.nameId').text('Enter Staff');
				 } else if (val == "patient") {			
					 parent.find('.nameId').text('Type Patient Id');
				 }
		    });
	   
	   },
	   	    
	   fnRiskAssessmentAdd: function (){	
			$document.on('click','.riskAsmntSave', function () {
			  var saveData = $(this).parents('.riskAsmntTable').find('.risk-assmnt-data');
			  var addData = $(this).parents('.riskAsmntTable').find('.add-input').val();
                
			  if(addData){
				saveData.prepend('<li>'+addData+"<button class='icon-btn'><i class='fa fa-close icon-red'><i></button></li>");
			  }
			});
           $document.on('click','.risk-assmnt-data li button', function () {
               $(this).parent().remove();
           });
           
	   },
	   
	   fnVisitorsList: function (){
			   $document.on('click','#addVisitor', function () {
				var VName =   $('#visitorName').val();
				var VMob =    $('#visitorMob').val();
				var VRemark = $('#visitorRemark').val();
							
				if (VName || VMob|| VRemark) {
					 $(this).parents('.search-add-list').find('.visitor-list').prepend('<li><span>'+VName+'</span><span>'+VMob+'</span>'+VRemark+' <button class="icon-btn pull-right"><i class="fa fa-close icon-red"></i></button></li>')
				  }
						
			});	
	   },
	   
	   fnContributoryFactors: function (){	
			 $document.on('click','.panelExpand', function () {			
				var objectID=$(this).attr('data-href');
				if($(objectID).hasClass('in')){
				  $(objectID).collapse('hide');
				}				
				else{
				  $(objectID).collapse('show');
				}
			 });			
			 $document.on('click','#expandAll', function () {   
			   $(this).toggleClass('expand');    
			    var $this = $(this);
			      if($(this).hasClass('expand')){  
					$('.panel-collapse ').collapse('show');
					$this.text('Collapse All')					
				  }else{					
					$('.panel-collapse ').collapse('hide');
					$this.text('Expand All');									  
				  }
			});
	   },
	   
	   fnRemoveFromList: function (){	
			 $document.on('click','.addList .icon-btn', function () {
				$(this).parent().remove();
			});
	   },
	   
	   fnIncidentReportMenu: function (){	      
			$document.on('click','#lftMenu a', function (evn) {
				evn.preventDefault();
				$('html,body').scrollTo(this.hash, this.hash); 
			});
	   },
	   
	   fnSearchIncidentReportTab: function (){
		   var ativeTab = $('.search-list a.active').attr('href');
           if($(".search-content").length > 0){
			   //  $('.search-content').load(ativeTab).show();
           }			
           $document.on('click','.search-list a', function (e) {
				e.preventDefault();
				$('.search-list a').removeClass("active");
				$(this).addClass("active");
				var tab = $(this).attr('href');	
				//$('.search-content').hide();
				//$('#'+index).fadeIn();			
				//$('.search-content').load(tab).fadeIn();				
										
			});

	   },
	   
	   fnIncidentSearch: function (){
		   $document.on('click','#seachIncident', function () {			
			 $('#collapseBtn').find('i').removeClass("fa-angle-up").addClass("fa-angle-down");			
		     $('.search-collapse').slideUp();
			 ;
		   });
	   },
	   
	   fnSearchCollapse: function (){
		   $document.on('click','#collapseBtn', function () {
			 if($('.search-collapse').is(":visible")){	
			    $('#collapseBtn').find('i').removeClass("fa-angle-up").addClass("fa-angle-down");			
		       $('.search-collapse').slideUp();			 
			 }else{
				 $(this).find('i').removeClass("fa-angle-down").addClass("fa-angle-up");
		         $('.search-collapse').slideDown();					 
			 }
		     		 
		   });
	   },
	   
       fnIncidentSearchContentTab: function (){	           
              var nav = $('.search-details #lftMenu');            
              if (nav.length) {  
                  if($window.scrollTop()+60 > 356){
                     nav.addClass('sticky');
                  }else {
                      nav.removeClass('sticky');                   
                   
                  }
              }
	   },
	   
       fnParticipants : function (){            
		  $document.on('click','#searchParticipantBtn', function () {			
				var val =  $('#searchParticipant').val();
				var $select =  $('#SelectParticipant').val();
								
				if(val){	
					//if($select == "staff"){	                      
						$('.participantsList').prepend('<li><div class="form-inputs"><input type="checkbox" value="1"><label>Jane Doe &lt;Medical Officer In Charge&gt;</label> </div></li>');
                  //  }
					$('.participantsList li').each(function(i){					    
						$('.participantsList li:first').find('input').attr('id','checkbox' +(i+1));	
						$('.participantsList li:first').find('label').attr('for','checkbox' +(i+1));		
					});					
				}
			});	
		   $document.on('click','#participants  button', function () {
				var parent =  $(this).parents('li');						
				if(parent.hasClass('inactive')){
					parent.removeClass('inactive');
					$(this).find('i').removeClass("fa-check").addClass("fa-close");				
				}else{
					parent.addClass('inactive');
					$(this).find('i').removeClass("fa-close").addClass("fa-check");	
				}
			});
           $document.on('keyup','#searchParticipant',function(e){  
					var searchField = $(this).val();
					var myExp = new RegExp(searchField, "i");
					var output = '<ul>';
					var count = 1;					
					$.getJSON('../data/staff.json', function(data) {
					  $.each(data, function(key, val){
						if ((val.id.search(myExp) != -1) || (val.name.search(myExp) != -1)) {
						  output += '<li>' + val.name +' &lt; '+val.role + ' &gt;</li>';	
						  count++;
						}									
					  });
					  
					  if (searchField) {
						  output += '</ul>';
						  $('.showParticipants').show().html(output);
					  }		  
					}); 
			});	
            $document.on('click','.showParticipants li', function () {            
                  var text = $(this).text();
                  $(this).parents('.showParticipants').hide();
                  $('.participantsList').prepend('<li><div class="form-inputs"><input type="checkbox" value="1"><label> '+ text +'</label> </div></li>');

                  $('.participantsList li').each(function(i){					    
                    $('.participantsList li:first').find('input').attr('id','checkbox' +(i+1));	
                    $('.participantsList li:first').find('label').attr('for','checkbox' +(i+1));		
                });	
            });
           $document.on('click','#addNewParticipant', function () {      
               var data = $('.participantsList li').find('input:checked').next('label').html();			   
               var addtList =  $('.participantsList li ');   
			   if ($(".participantsList li input:checkbox:checked").length > 0){
					   $('.participantListView').prepend('<li>'+data+'<button class="icon-btn pull-right"><i class="fa fa-check icon-red"></i></button></li>');	
			   }
            });
           
       },
	   
       fnSaveIncident: function (){
           $document.on('click','#saveIncident', function () { 
               $('.alert').fadeIn();               
                window.setTimeout(function() {		       
				$('.alert').fadeOut();
		       }, 5000);
           });
          
       },
	   fnRiskRank: function (){
           $document.on('click','.risk-matrix-table .cell', function () { 
		       $('.cell').removeClass('active');
               $(this).addClass('active');
           });
          
       } 
	    
	}
	
    /* ---------- document ready, resize ------------ */ 
    PORTAL.documentOnReady = {
        init: function() {
            PORTAL.initialize.init();   
        }
    };
    
    //window on scroll
    PORTAL.windowOnscroll = {
        init: function() {
            $window.on( 'scroll', function(){	               
               PORTAL.initialize.fnIncidentSearchContentTab();			   
            });
        }
    };
	/* -----------Call Functions ---------------- */    
    $document.ready(
        PORTAL.documentOnReady.init,
        PORTAL.windowOnscroll.init()
    );

})(jQuery);
