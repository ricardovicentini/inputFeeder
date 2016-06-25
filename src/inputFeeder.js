(function($){
	
	$.extend($.expr[":"], {
		"containsIN": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	$.fn.popCheckBox = function(options){
		
		var div = this;
		
		$(div).empty();

		var settings = $.extend({
		data: undefined,
		dataMapper: undefined,
		filterIgnoreCase: true,
		columns: 1,
        Title: 'Title',
		classes: []
		}, options);
	
       
	
		if(settings.data === undefined)
		{
			div.append(
				$('<label>',{text:'No data to pop checkbox.'})
			);
		}
		
		if(settings.dataMapper === undefined)
		{
			div.append(
				$('<label>',{text:'Please inform the mapper for the data.'})
			);
		}
		
		div.append($('<div>', { id: 'divFilter' }));

		$('#divFilter').append($('<div>', { class: 'col-sm-12 widget-container-span', id: 'divContainer' }));
		$('#divContainer').append($('<div>', { class: 'widget-box', id: 'divBox' }));
		$('#divBox').append($('<div>', { class: 'widget-header', id: 'divWidHeader' }));
		$('#divWidHeader').append($('<h5>', { class: 'smaller', text: 'Usuarios: ' }));

        //Botão de procura
		//$('#divWidHeader').append($('<button>', { id: 'btnProcura' }));
		//$('#btnProcura').append($('<i>', { class: 'icon-search' }));
        		
		$('#divWidHeader').append($('<input>', { 'type': 'text', 'value': '', 'id': 'filterText' }));

		$('#divWidHeader').append($('<button>', { id: 'btnClearFilter' }));
		$('#btnClearFilter').append($('<i>', { class: 'fa fa-times' }));

	    $('#divWidHeader').append($('<div>', { class: 'widget-toolbar no-border', id: 'divWidTool' }));

	    $('#divWidTool').append($('<label>', { id: 'lblChecks' }));
	    $('#lblChecks').append($('<span>', { text: 'Selecionar todos' }));
	    $('#lblChecks').append($('<input>', { type: 'checkbox', name: 'checkAll', id: 'checkAll', class: 'ace ace-switch ace-switch-6' }));
	    $('#lblChecks').append($('<span>', { class: 'lbl' }));

	    $('#divBox').append($('<div>', { class: 'widget-body', id: 'divWidBody',style: 'height:390px;' }));
		$('#divWidBody').append($('<div>', { class: 'widget-main', id: 'divWidMain' }));
		$('#divWidMain').append($('<div>', { class: 'alert alert-info', id: 'divAlert', style: 'height:366px;overflow-x:auto' }));
		$('#divAlert').append($('<div>', { class: 'align-center col-md-12 col-sm-12 col-lg-12', id: 'divConteudo', style: 'float:none' }));
        
		$('#divConteudo').append($('<BR>', null));
		$('#divConteudo').append($('<div>', { id: 'divCheckList', style: 'float:none;' }));
		
		var count = 1;
		var column = 1;
		

		var totalRecords = settings.data.length;
		var recordsPerColumn = Math.ceil(totalRecords / settings.columns);
		var bootstrapWidth = 12 / settings.columns;

		$('#divCheckList').append($('<ul>', { id: 'ul1', class: 'col-sm-' + bootstrapWidth, style: 'margin: 0 0 0 0' }));
		var ulElement = $('#ul1');

		$.each(settings.data, function(){
			
			ulElement.append(
				$('<li>',{'id':'li_' + this[settings.dataMapper.id], class:'checklist'})
			);
			$('#li_' + this[settings.dataMapper.id]).append(
				$(document.createElement('input')).attr({
					 id:    this[settings.dataMapper.id]
					  ,name:  this[settings.dataMapper.id]
					  ,value: this[settings.dataMapper.value]
					  ,type:  'checkbox'
				})
			);
			$('#li_' + this[settings.dataMapper.id]).append(
				$('<label>',{'for': this[settings.dataMapper.id], text:this[settings.dataMapper.label]})
			);	
			
			if (count % recordsPerColumn == 0 && count < totalRecords) {
			    $('#divCheckList').append($('<ul>', { 'id': 'ul_' + column, class: 'col-sm-' + bootstrapWidth, style: 'margin: 0 0 0 0' }));
			    ulElement = $('#ul_' + column);
			    column++;
			}

            /*
			if (isMultiple) {
			    if (count % recordsPerColumn == 0 && count < totalRecords) {
			        $('#divCheckList').append($('<ul>', { 'id': 'ul_' + column, class: 'col-sm-' + bootstrapWidth }));
			        ulElement = $('#ul_' + column);
			        column++;
			    }
			}
			else {
			    if (column == 1) {
			        if (count == (recordsPerColumn + 1)) {
			            $('#divCheckList').append($('<ul>', { 'id': 'ul_' + column, class: 'col-sm-' + bootstrapWidth }));
			            ulElement = $('#ul_' + column);
			            column++;
			        }
			    }
			    else
			    {
			        if (count % recordsPerColumn == 0 && count < totalRecords) {
			            $('#divCheckList').append($('<ul>', { 'id': 'ul_' + column, class: 'col-sm-' + bootstrapWidth }));
			            ulElement = $('#ul_' + column);
			            column++;
			        }
			    }
			}
            */
			count++;
		});
		
		$('#filterText').keyup(function(){
			var filter = this.value;
			if(filter == ''){
				$('#divCheckList ul > li').addClass('checklist');
				$('#divCheckList ul > li').show();
				
			}
			else
			{
				if(settings.filterIgnoreCase)
				{
					$('#divCheckList ul > li:not(:containsIN(' + filter + '))').removeClass('checklist');
					$('#divCheckList ul > li:not(:containsIN(' + filter + '))').hide();
					$('#divCheckList ul > li:containsIN(' + filter + ')').addClass('checklist');
					$('#divCheckList ul > li:containsIN(' + filter + ')').show();	
				}
				else
				{
					$('#divCheckList ul > li:not(:contains(' + filter + '))').removeClass('checklist');
					$('#divCheckList ul > li:not(:contains(' + filter + '))').hide();
					$('#divCheckList ul > li:contains(' + filter + ')').addClass('checklist');
					$('#divCheckList ul > li:contains(' + filter + ')').show();	
				}				
			}
		});
		
		$('.checklist input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
              //callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
			  //alert('oi');
            }).iCheck({
              checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
			
		$('#btnClearFilter').click(function(){
			$('#filterText').val("");
			$('#filterText').keyup();
			$('#filterText').focus();
			return false;
		});
	
		$("#checkAll").change(function () {
		    if (this.checked) {
		        $('.checklist input').iCheck('check');
		    }
		    else {
		        $('.checklist input').iCheck('uncheck');
		    }
		});

		//$('#btnProcura').click(function () {
		//    $('#filterText').val("");
		//    $('#filterText').keyup();

		//    $('#filterText').toggle(function () {
		//        $("#filterText").addClass("ocultar");
		//    }, function () {
		//        $("#filterText").removeClass("ocultar");
		//    });

		//    $('#btnClearFilter').toggle(function () {
		//        $("#btnClearFilter").addClass("ocultar");
		//    }, function () {
		//        $("#btnClearFilter").removeClass("ocultar");
		//    });

		//    return false;
		//});

		return this;
	}
}(jQuery));