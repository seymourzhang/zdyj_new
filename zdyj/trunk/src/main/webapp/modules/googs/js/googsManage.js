var objGoods = new Object();

$(document).ready(function() {
	initObjGoods();

//	$(".date-picker").datepicker({
//		language : 'zh-CN',
//		autoclose : true,
//		todayHighlight : true
//	});
//
//	$(".date-picker1").datepicker({
//		language : 'zh-CN',
//		autoclose : true,
//		defaultDate : new Date(),
//		todayHighlight : true
//	});
//	$(".date-picker1").datepicker('setDate', new Date());//
	
//	setCorporation();
//	setFactory();
//	setGoodName()
	
	var dataJosn;
	initTable("corporation", getCorporationTableColumns(), dataJosn);
	initTable("factory", getFactoryTableColumns(), dataJosn);
	initTableWithToolBar("goods",'goodsToolbar', getGoodsTableColumns(), dataJosn);
	initTable("corporationGood", getCorporationGoodTableColumns(), dataJosn);

//	getCorporation();
//	getFactory();
//	queryGoods();
//	getCorporationGood();
	
});

function getCorporationTableColumns(){
	var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "corporation_id",
        title: "ID",
        visible: false
    },{
        field: "corporation",
        title: "供应商"
    },{
    	field: "corporation_person",
        title: "供应商负责人"
    },{
    	field: "corporation_address",
        title: "地址"
    },{
    	field: "telphone",
        title: "联系电话"
    },{
    	field: "bak",
        title: "备注"
    }];
	return dataColumns;
}

function getCorporation() {
	$.ajax({
		url : path + "/googs/getCorporation2",
		data : {
			"corporation" : $("#corporation").val()
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporationTable").bootstrapTable("load",list);
		}
	});
}

/*获取厂家列表*/
function getFactoryTableColumns(){
	var dataColumns = [{
        checkbox: true,
        width: '5%'
    }, {
        field: "factory_id",
        title: "ID",
        visible: false
    },{
        field: "factory_name",
        title: "厂家名称",
        width: '18%'
    },{
        field: "factory_person",
        title: "厂家负责人",
        width: '8%'
    },{
    	field: "factory_address",
        title: "地址",
        width: '20%'
    },{
    	field: "telphone",
        title: "联系电话",
        width: '10%'
    },{
    	field: "bak",
        title: "备注",
        width: '20%'
    }];
	return dataColumns;
}

function getFactory() {
	$.ajax({
		url : path + "/googs/getFactory2",
		data : {
			"factory_name" : $("#factory_name").val()
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factoryTable").bootstrapTable("load",list);
		}
	});
}

/****弹出新增供应商窗口*****/
function openCorporationWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
	
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '<span_customer2 >供应商</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 130px;" name="corporation1" id="corporation1"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >负责人</span_customer2 >' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -64px;margin-top:-3px;width: 130px;" name="corporation_person" id="corporation_person"/>' ;
			str += '</div>';
			str += '<div class="span2">';
			str += '<span_customer2 >联系电话</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -55px;margin-top:-3px;width: 140px;" name="telphone" id="telphone"/>';
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >地址</span_customer2 >';
    str += '</div>';
	str += '<div class="span2">';
		str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 130px;" name="corporation_address" id="corporation_address"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str+='<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 365px;" name="bak" id="bak"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['670px', '190px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm()){ 
		var param;
		param ={corporation:$("input[name='corporation1']").val(),
				corporation_person:$("#corporation_person").val(),
				corporation_address:$("#corporation_address").val(),
				telphone:$("#telphone").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addCorporation",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

function submitForm(){
	var corporation=$("input[name='corporation1']").val();
	var corporation_person=$("input[name='corporation_person']").val();
	var corporation_address=$("input[name='corporation_address']").val();
	var telphone=$("input[name='telphone']").val();
	if(corporation =="" ){
			layer.msg("供应商不能为空！");
			return false;
	}else
		if(corporation_person =="" ){
			layer.msg("供应商负责人不能为空！");
			return false;
	}else if(corporation_address =="" ){
		layer.msg("地址不能为空！");
		return false;
}else if(telphone =="" ){
	layer.msg("联系电话不能为空！");
	return false;
  }	
return true;
}

/****弹出新增厂家窗口*****/
function openFactoryWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '<span_customer2 >厂家</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_name1" id="factory_name1"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >负责人</span_customer2 >' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 130px;" name="factory_person" id="factory_person"/>' ;
			str += '</div>';
			str += '<div class="span2">';
			str += '<span_customer2 >联系电话</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 145px;" name="telphone" id="telphone"/>';
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >地址</span_customer2 >';
    str += '</div>';
	str += '<div class="span2">';
		str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_address" id="factory_address"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str+='<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 375px;" name="bak" id="bak"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['710px', '200px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm2()){ 
		var param;
		param ={factory_name:$("input[name='factory_name1']").val(),
				factory_person:$("#factory_person").val(),
				factory_address:$("#factory_address").val(),
				telphone:$("#telphone").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addFactory",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#factoryTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

function submitForm2(){
	var factory_name=$("input[name='factory_name1']").val();
	var factory_person=$("input[name='factory_person']").val();
	var factory_address=$("input[name='factory_address']").val();
	var telphone=$("input[name='telphone']").val();
	if(factory_name =="" ){
			layer.msg("厂家不能为空！");
			return false;
	}else
		if(factory_person =="" ){
			layer.msg("厂家负责人不能为空！");
			return false;
	}else if(factory_address =="" ){
		layer.msg("地址不能为空！");
		return false;
}else if(telphone =="" ){
	layer.msg("联系电话不能为空！");
	return false;
  }	
return true;
}

/****弹出新增物资窗口*****/
function openGoodsWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >物资类别</span_customer2 >';
str += '</div>';
	str += '<div class="span4">';
	
		str += "<select id='good_type' style='width: 115px;margin-top: -3px;margin-left:-10px;' tabindex='1' name='good_type'>";
     str+='</select>';
	str += '</div>';	
	str += '<div class="span2">';
	str += '<span_customer2 >物资名称</span_customer2 >' ;
str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 130px;margin-top: -3px;margin-left:-10px;" name="good_name1" id="good_name1"/>' ;
	str += '</div>';
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >物资编号</span_customer2 >';
    str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 100px;margin-top: -3px;margin-left:-10px;" name="good_code" id="good_code"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span4">';
			str += '<input type="text" style="width: 130px;margin-top: -3px;margin-left:-10px;" name="bak" id="bak"/>';
			str += '</div>';
//			str += '<div class="span1">';
//			str += '厂家:' ;
//			str += '</div>';
//				str += '<div class="span1">';
//				str += "<select id='factory' style='width: 115px;' class='m-wrap span12' tabindex='1' name='factory'>";
//				var myobj=factory.split("=");
//				for (var j = 0; j < myobj.length; j++) {
//					if(myobj[j].indexOf("factory_id") > 0 ){
//						var tt = myobj[j+2];
//						 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//						 
//					}
//						
//				}
//		     str+='</select>';
//				str += '</div>';	
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['445px', '190px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm3()){ 
		var param;
		param ={good_code:$("input[name='good_code']").val(),
				good_name:$("#good_name1").val(),
				good_type:$("#good_type").val(),
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/addGoods",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#goodsTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
setGoodType();
}

function submitForm3(){
	var good_code=$("input[name='good_code']").val();
	var good_name=$("input[name='good_name1']").val();
	var good_type=$("input[name='good_type']").val();
	if(good_code =="" ){
		    layer.msg("物资编码不能为空！");
			return false;
	}else
		if(good_name =="" ){
			layer.msg("物资名称不能为空！");
			return false;
	}else if(good_type =="" ){
		layer.msg("物资类别不能为空！");
		return false;
}
return true;
}

/****弹出新增物资供应商关系窗口*****/
function opencorporationGoodWin(){
	if (isRead == 0) {
		layer.alert('无权限，请联系管理员!', {
			skin : 'layui-layer-lan',
			closeBtn : 0,
			shift : 4
		// 动画类型
		});
		return;
	}
var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >物资类别</span_customer2 >';
    str += '</div>';
	str += '<div class="span2">';
		str += '<select id="good_type" style="width: 149px;margin-top:-3px;margin-left: -65px;" tabindex="1" name="good_type" onchange="setGoodName()">';
//		var myobj=goodTypeList.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("code_name") > 0 ){
//				 str +="<option value=" + myobj[j-1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//			}
//				
//		}
     str+='</select>';
	str += '</div>';
	str += '<div class="span2">';
	str += '<span_customer2 >物资名称</span_customer2 >' ;
str += '</div>';
	str += '<div class="span2" >';
	str += "<select id='goods' style='width: 149px;margin-top:-3px;margin-left: -38px;' tabindex='1' name='goods'>";
//	var goods = setGoodName();
//	var myobj=goods.split("=");
//	for (var j = 0; j < goods.length; j++) {
//		if(myobj[j].indexOf("good_id") > 0 ){
//			var tt = myobj[j+2];
//			 str +="<option value=" + goods[j].good_id+","+ goods[j].good_name +">" + goods[j].good_name + "</option>";
			 
//		}
			
//	}
 str+='</select>';
	str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >单价</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="width: 135px;margin-top:-3px;margin-left: -35px;" name="price" id="price"/>' ;
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >规格</span_customer2 >';
	str += '</div>';
	str += '<div class="span2">';
	str += "<select id='spec' style='width: 115px;display:none;' tabindex='1' name='spec'>";
//	var myobj=spec.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("code_name") > 0 ){
//			 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//		}
//			
//	}
 str+='</select>';
 str+='<input type="text" id="spec_select" style="width: 135px;margin-top:-3px;margin-left: -65px;" data-provide="typeahead" placeholder="请输入规格" autocomplete="off" onchange="empty()" />';
	str += '</div>';
	str += '<div class="span2">';
	str += '<span_customer2 >单位</span_customer2 >';
	str += '</div>';
	str += '<div class="span2">';
	str += "<select id='unit' style='width: 115px;display:none;' tabindex='1' name='unit'>";
//	var myobj=unit.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("code_name") > 0 ){
//			 str +="<option value=" + myobj[j+1].split(",")[0] +">" + myobj[j+1].split(",")[0] + "</option>";
//		}
//			
//	}
 str+='</select>';
 str+='<input type="text" id="unit_select" style="width: 135px;margin-top:-3px;margin-left: -38px;" data-provide="typeahead" placeholder="请输入单位" autocomplete="off" onchange="empty()" />';
	str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >备注</span_customer2>';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="width: 135px;margin-top:-3px;margin-left: -35px;" name="bak" id="bak"/>';
			str += '</div>';	
	str += '</div>';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >供应商</span_customer2 >';
    str += '</div>';
    str += '<div class="span2">';
    str += "<select id='corporation1' style='width: 115px;display:none;' tabindex='1' name='corporation1'>";
//	var myobj=corporation.split("=");
//	for (var j = 0; j < myobj.length; j++) {
//		if(myobj[j].indexOf("corporation_id") > 0 ){
//			var tt = myobj[j+2];
//			 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//			 
//		}
//			
//	}
 str+='</select>';
 str+='<input type="text" id="corporation1_select" style="width: 135px;margin-top:-3px;margin-left: -65px;" data-provide="typeahead" placeholder="请输入供应商" autocomplete="off" onchange="empty()" />';
    str += '</div>';
    str += '<div class="span2">';
	str += '<span_customer2 >厂家</span_customer2 >' ;
	str += '</div>';
		str += '<div class="span2">';
		str += "<select id='factory' style='width: 115px;display:none;' tabindex='1' name='factory'>";
//		var myobj=factory.split("=");
//		for (var j = 0; j < myobj.length; j++) {
//			if(myobj[j].indexOf("factory_id") > 0 ){
//				var tt = myobj[j+2];
//				 str +="<option value=" + myobj[j+1].split(",")[0]+","+ tt.split(",")[0] +">" + tt.split(",")[0] + "</option>";
//				 
//			}
//				
//		}
     str+='</select>';
     str+='<input type="text" id="factory_select" style="width: 135px;margin-top:-3px;margin-left: -38px;" data-provide="typeahead" placeholder="请输入厂家" autocomplete="off" onchange="empty()" />';
		str += '</div>';
    str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['770px', '230px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){ 
		var param;
		param ={goods:$("#goods").val(),
				price:$("#price").val(),
				good_type:$("#good_type").val(),
				spec:$("#spec").val(),
				unit:$("#unit").val(),
				bak:$("#bak").val(),
				corporation:$("#corporation1").val(),
				factory:$("#factory").val()};
		$.ajax({
			url : path + "/googs/addCorporationGood",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationGoodTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	});
setSpec();
setGoodType();
setUnit();
setFactory();
setCorporation(); 
}

function setGoodName() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoods",
		data : {
			"good_type" : $("#good_type").val()
		},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#goods option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#goods").append('<option value="' + list[i].good_id+','+list[i].good_name + '">' + list[i].good_name + '</option>');
			}
            
		}
	});
}

function setGoodType() {
	$.ajax({
		type : "post",
		url : path + "/googs/getGoodType",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#good_type option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#good_type").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
			setGoodName();
		}
	});
}

function setSpec() {
	$.ajax({
		type : "post",
		url : path + "/googs/getSpec",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#spec option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#spec").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
		}
	});
}

function setUnit() {
	$.ajax({
		type : "post",
		url : path + "/googs/getUnit",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#unit option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#unit").append("<option value=" + list[i].biz_code + ">" + list[i].code_name + "</option>");
			}
		}
	});
}

function setCorporation() {
	$.ajax({
		type : "post",
		url : path + "/googs/getCorporation2",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#corporation1 option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#corporation1").append('<option value="' + list[i].corporation_id+','+list[i].corporation + '">' + list[i].corporation + '</option>');
			}
			//初始化规格、单位、厂家、供应商
			initSpecSelect();
		}
	});
}

function setFactory() {
	$.ajax({
		type : "post",
		url : path + "/googs/getFactory",
		data : {},
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			$("#factory option").remove();
			for (var i = 0; i < list.length; i++) {
				$("#factory").append('<option value="' + list[i].factory_id+','+list[i].factory_name + '">' + list[i].factory_name + '</option>');
			}
		}
	})
}


function getGoodsTableColumns(){
	var dataColumns = [{
        checkbox: true,
        title: "选择",
        width: '5%'
    }, {
        field: "good_id",
        title: "ID",
        visible: false
    },{
    	field: "good_code",
        title: "物资编号",
        width: '15%'
    },{
        field: "good_name",
        title: "物资名称",
        width: '20%'
    },{
        field: "good_type",
        title: "物资类型",
        width: '20%'
    },{
    	field: "bak",
        title: "备注",
        width: '40%'
    }];
	return dataColumns;
}
function queryGoods(){

	var param = $.serializeObject($('#goodsForm'));
	$.ajax({
		url : path + "/googs/getGoods2",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			var dataJosn = $.parseJSON(JSON.stringify(list));
			$("#goodsTable").bootstrapTable("load",dataJosn);
		}
	});
}

function getCorporationGoodTableColumns(){
	var dataColumns = [{
        checkbox: true,
        title: "选择",
        width: '5%'
    }, {
        field: "id",
        title: "ID",
        visible: false
    },{
        field: "good_name",
        title: "物资名称",
        width: '10%'
    },{
    	field: "spec",
        title: "规格",
        width: '10%'
    },{
    	field: "price",
        title: "单价",
        width: '8%'
    },{
    	field: "unit",
        title: "单位",
        width: '5%'
    },{
    	field: "factory_name",
        title: "厂家",
        width: '18%'
    },{
    	field: "corporation",
        title: "供应商",
        width: '18%'
    },{
    	field: "bak",
        title: "备注",
        width: '20%'
    }];
	return dataColumns;
}

function getCorporationGood(){

	var param = $.serializeObject($('#corporationGoodForm'));
	$.ajax({
		url : path + "/googs/getCorporationGood",
		data : param,
		type : "POST",
		dataType : "json",
		success : function(result) {
			var list = result.obj;
			var dataJosn = $.parseJSON(JSON.stringify(list));
			$("#corporationGoodTable").bootstrapTable("load",dataJosn);
		}
	});
}

//修改供应商
function updateCorporation(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#corporationTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }
    
    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '<span_customer2 >供应商</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 130px;" name="corporation1" id="corporation1" value="'+updateRow[0].corporation+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >负责人</span_customer2 >' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 130px;" name="corporation_person" id="corporation_person" value="'+updateRow[0].corporation_person+'"/>' ;
			str += '</div>';
			str += '<div class="span2">';
			str += '<span_customer2 >联系电话</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -50px;margin-top:-3px;width: 130px;" name="telphone" id="telphone" value="'+updateRow[0].telphone+'"/>';
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >地址</span_customer2 >';
str += '</div>';
	str += '<div class="span2">';
		str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 130px;" name="corporation_address" id="corporation_address" value="'+updateRow[0].corporation_address+'"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str+='<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -65px;margin-top:-3px;width: 360px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['670px', '190px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm()){ 
		var param;
		param ={corporation:$("input[name='corporation1']").val(),
				corporation_person:$("#corporation_person").val(),
				corporation_address:$("#corporation_address").val(),
				telphone:$("#telphone").val(),
				corporation_id:updateRow[0].corporation_id,
				bak:$("#bak").val()};
		
		$.ajax({
			url : path + "/googs/updateCorporation",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#corporationTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
    
}

//修改厂家
function updateFactory(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#factoryTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }
    
    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '<span_customer2 >厂家</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_name1" id="factory_name1"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >负责人</span_customer2 >' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 130px;" name="factory_person" id="factory_person"/>' ;
			str += '</div>';
			str += '<div class="span2">';
			str += '<span_customer2 >联系电话</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 145px;" name="telphone" id="telphone"/>';
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >地址</span_customer2 >';
    str += '</div>';
	str += '<div class="span2">';
		str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_address" id="factory_address"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str+='<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 360px;" name="bak" id="bak"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';

    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
		str += '<div class="span2">';
			str += '<span_customer2 >厂家</span_customer2 >';
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_name1" id="factory_name1" value="'+updateRow[0].factory_name+'"/>' ;
			str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >负责人</span_customer2 >' ;
		str += '</div>';
			str += '<div class="span2" >';
				str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 130px;" name="factory_person" id="factory_person" value="'+updateRow[0].factory_person+'"/>' ;
			str += '</div>';
			str += '<div class="span2">';
			str += '<span_customer2 >联系电话</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 145px;" name="telphone" id="telphone" value="'+updateRow[0].telphone+'"/>';
			str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >地址</span_customer2 >';
    str += '</div>';
	str += '<div class="span2">';
		str += '<input type="text" style="margin-left: -75px;margin-top:-3px;width: 140px;" name="factory_address" id="factory_address" value="'+updateRow[0].factory_address+'"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str+='<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span2">';
			str += '<input type="text" style="margin-left: -60px;margin-top:-3px;width: 375px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
		str += '<div class="span2">';
			
		str += '</div>';
			str += '<div class="span2">';
			
			str += '</div>';
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['710px', '200px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm2()){ 
		var param;
		param ={factory_name:$("input[name='factory_name1']").val(),
				factory_person:$("#factory_person").val(),
				factory_address:$("#factory_address").val(),
				telphone:$("#telphone").val(),
				factory_id:updateRow[0].factory_id,
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/updateFactory",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#factoryTable").bootstrapTable('load',dataJosn);
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
	  }
	  }
	});
}

//修改物资
function updateGoods(){
	if(isRead==0){
		layer.alert('无权限，请联系管理员!', {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 4 //动画类型
		  });
		return;
	}

	var updateRow;
	updateRow = $('#goodsTable').bootstrapTable('getSelections');
    if (updateRow.length==0) {
        layer.alert('请选择要修改的记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }else if (updateRow.length>1) {
        layer.alert('只允许修改一条记录！!', {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 4 //动画类型
        });
        return;
    }

    var str = '<br><div class="container-fluid" >';
	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >物资类别</span_customer2 >';
str += '</div>';
	str += '<div class="span4">';
		str += '<select id="good_type" style="width: 115px;margin-top: -3px;margin-left:-9px;" class="m-wrap span12" tabindex="1" name="good_type" value="'+updateRow[0].good_type+'">';
     str+='</select>';
	str += '</div>';
	str += '<div class="span2">';
	str += '<span_customer2 >物资名称</span_customer >' ;
str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 130px;margin-top: -3px;margin-left:-9px;" name="good_name1" id="good_name1" value="'+updateRow[0].good_name+'"/>' ;
	str += '</div>';	
	str += '</div>';

	str += '<div class="row-fluid">';
	str += '<div class="span2">';
	str += '<span_customer2 >物资编号</span_customer >';
str += '</div>';
	str += '<div class="span4" >';
		str += '<input type="text" style="width: 101px;margin-top: -3px;margin-left:-9px;" name="good_code" id="good_code" value="'+updateRow[0].good_code+'" disabled="disabled"/>' ;
	str += '</div>';
		str += '<div class="span2">';
			str += '<span_customer2 >备注</span_customer2 >';
		str += '</div>';
			str += '<div class="span4">';
			str += '<input type="text" style="width: 130px;margin-top: -3px;margin-left:-10px;" name="bak" id="bak" value="'+updateRow[0].bak+'"/>';
			str += '</div>';
	str += '</div>';
//	str+='<div class="span2"><label style="padding-left: 70px;color: red; width:450px; text-align: center;margin-top: 15px;" id="add_msg"></label></div>';
	str += '</div>';
layer.open({
	  type: 1,
	  skin: 'layui-layer-lan', //加上边框
	  area: ['445px', '190px'], //宽高
	  content: str,
	  btn: ['确定','取消'],
	  yes: function(index){
		if(submitForm3()){
		var param;
		param ={good_code:$("input[name='good_code']").val(),
				good_name:$("#good_name1").val(),
				good_type:$("#good_type").val(),
				good_id:updateRow[0].good_id,
				bak:$("#bak").val()};
		$.ajax({
			url : path + "/googs/updateGoods",
			data : param,
			type : "POST",
			dataType : "json",
			success : function(result) {
				var obj = result.obj;
				layer.close(index); 
				var dataJosn = $.parseJSON(JSON.stringify(obj));
                $("#goodsTable").bootstrapTable('load',dataJosn); 
				if(result.msg=="1") {
					layer.msg('操作成功!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}else{
					layer.msg('数据重复，操作失败!', {
						skin : 'layui-layer-lan',
						closeBtn : 0,
						shift : 4
					// 动画类型
					});
				}
			}
		});
		}
	  }
	});
setGoodType();
}

//切换标签页事件处理
//$(function(){
//	$('a[data-toggle="tab"]').on('shown', function (e) {
//		if("供应商" == $(e.target).text()){
//			getCorporation();
//			return;
//		}
//		if("厂家" == $(e.target).text()){
//			getFactory();
//			return;
//		}
//		if("物资" == $(e.target).text()){
//			queryGoods();
//			return;
//		}
//		if("物资关系" == $(e.target).text()){
//			queryGoods();
//			return;
//		}
//	});
//});

function initObjGoods(){
	objGoods.farmId =  document.getElementById("farmId").value;
	objGoods.farm =  document.getElementById("farm").value;

//	document.getElementById("corporationFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
//	document.getElementById("factoryFarmTitle").innerHTML =  "<font size='4' ><B>" + objGoods.farm +"</B></font>";
//	document.getElementById("goodsFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
//	document.getElementById("corporationGoodFarmTitle").innerHTML = "<font size='4' ><B>" + objGoods.farm +"</B></font>";
}

function initSpecSelect(){
    $.fn.typeahead.Constructor.prototype.blur = function() {
        var that = this;
        setTimeout(function () { that.hide(); }, 250);
    };

    //规格
    $('#spec_select').typeahead({
        source: function(query, process) {
        	var results=null;
        	if(query.length>=4){
        	var goods = getSpecNameList('spec', query);
            results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("spec").value = null;
            }
            process(results);
        	}else{
        		document.getElementById("spec").value = null;
        		layer.msg("请至少输入4位字符");
        		return;
        	}
           
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getSpecNameList('spec', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getSpecNameList('spec', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getSpecNameList('spec', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setSpecInfo('spec', good.id);
            return good.text;
        }
    });
    
    //供应商
    $('#corporation1_select').typeahead({
        source: function(query, process) {
        	var goods = getSpecNameList('corporation1', query);
            var results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("corporation1").value = null;
            }
            process(results);
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getSpecNameList('corporation1', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getSpecNameList('corporation1', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getSpecNameList('corporation1', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setSpecInfo('corporation1', good.id);
            return good.text;
        }
    });
    
     //单位
    $('#unit_select').typeahead({
        source: function(query, process) {
        	var goods = getSpecNameList('unit', query);
            var results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("unit").value = null;
            }
            process(results);
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getSpecNameList('unit', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getSpecNameList('unit', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getSpecNameList('unit', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setSpecInfo('unit', good.id);
            return good.text;
        }
    });
    
     //厂家
    $('#factory_select').typeahead({
        source: function(query, process) {
        	var goods = getSpecNameList('factory', query);
            var results = goods.map(function (item,index,input){
                return item.id+"";
			});
            if(results.length ==0){
            	document.getElementById("factory").value = null;
            }
            process(results);
            // return goods;
        }
        ,matcher: function (item) {
            var goods = getSpecNameList('factory', item);
            var flag = false;
            for(var key in goods){
            	if(item == goods[key].id || item == goods[key].text){
            		flag = true;
				}
			}
            return flag;
		}
        ,highlighter: function (item) {
            var goods = getSpecNameList('factory', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            return good.text;
        }
        ,updater: function (item) {
            var goods = getSpecNameList('factory', item);
            var good = goods.find(function (p) {
                return p.id == item;
            });
            setSpecInfo('factory', good.id);
            return good.text;
        }
    });
    
}  

function setSpecInfo(selectName, goodId){
    var select = document.getElementById(selectName);
    var options = select.options;
    for(var key in options){
        if(goodId == options[key].value){
        	options[key].selected = true;
        }
	}
}

function getSpecNameList(selectName, value){
	var specNameList = [];
    var select = document.getElementById(selectName);
    var options = select.options;
	var oValue = "";
    var oText = "";
	for(var key in options){
        oValue = options[key].value;
		oText = options[key].text;
        var oTextFlag = new RegExp(value).test(oText);
        var oValueFlag = new RegExp(value).test(oValue);
		if(oTextFlag == true || oValueFlag == true){
			specNameList.push({id:oValue, text:oText});
		}
	}
	return specNameList;
}

function empty(){
	if(document.getElementById("spec_select").value==""){
		document.getElementById("spec").value = null;
	}	
	if(document.getElementById("corporation1_select").value==""){
		document.getElementById("corporation1").value = null;
	}
	if(document.getElementById("unit_select").value==""){
		document.getElementById("unit").value = null;
	}
	if(document.getElementById("factory_select").value==""){
		document.getElementById("factory").value = null;
	}
}

function deletecorporationGood(){
	var deleteRow;
	var deleteRow2 ="";
    deleteRow = $('#corporationGoodTable').bootstrapTable('getSelections');
    if(deleteRow==null||deleteRow==''){
		 layer.alert('请选择要删除的数据!', {
				skin : 'layui-layer-lan',
				closeBtn : 0,
				shift : 4
			// 动画类型
			});
		 return;
	 }
    for(var i = 0; i < deleteRow.length; i++){
    	deleteRow2 = deleteRow2+deleteRow[i].id+";";
    }
    // document.getElementById("reflushText2").style.display="inline";
    layer.confirm('是否确认删除？', {
        skin: 'layui-layer-lan'
        , closeBtn: 0
        , shift: 4 //动画类型
    }, function ok() {
    	$.ajax({
            // async: true,
            url: path+"/googs/deleteCorporationGoods",
            data: {"deleteRow":deleteRow2},
            type : "POST",
            dataType: "json",
            cache: false,
            // timeout:50000,
            success: function(result) {     
                    var obj = result.obj;
                    if(null != obj) {
                        var dataJosn = $.parseJSON(JSON.stringify(obj));
                        $("#corporationGoodTable").bootstrapTable('load',dataJosn);
                    } 
//                    else{
//                        initTableRow("fact", getTableEmptyRow("fact"));
//                    }
                    layer.msg('删除成功!');
            }
        });
    });
}


