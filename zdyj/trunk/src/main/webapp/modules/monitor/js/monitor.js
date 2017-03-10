var count0rg;
var num=2;
var allSearch = "true";
var orgLevel = 2;
var pSize = null;

$(document).ready(function() {
    App.init(); // initlayout and core plugins

    $("#lm1").attr("class","active");
    $("#se1").attr("class","selected");
    $("#z101").attr("class","active");
    $("#op1").attr("class","arrow open");
    $("#monitorExpand").removeClass("collapse").addClass("expand");

//    $("#monitor_date_table").removeClass("table-hover");

    $("#enableMonitorSet").change(function() {
        OrgSearch(count0rg,num);
    });

    initHelp();
});

function initHelp(){
    help.size = ['600px', '524px'];
    help.context = document.getElementById("helpContext").innerHTML;
}

//$(function() {
//    $('#tbodyMonitorCurList').vTicker({      
//        speed: 700,           //滚动速度，单位毫秒。
//            pause: 4000,            //暂停时间，就是滚动一条之后停留的时间，单位毫秒。                          
//            showItems: 1,           //显示内容的条数。                          
//            mousePause: true,       //鼠标移动到内容上是否暂停滚动，默认为true。                           
//            height: 0,              //滚动内容的高度。
//            direction: 'up' ,      //滚动的方向，默认为up向上，down则为向下滚动。                           
//            animation: 'fade',    //动画效果，默认是fade，淡出。    
//            mousePause: true      //鼠标移动到内容上是否暂停滚动，默认为true。
//     
//    });
//});

//新增
function monitorSetting(){
    layer.open({
        type: 2,
        title: "新增",
        skin: 'layui-layer-lan',
        area: ['450px', '450px'],
        content: '<%=path%>/monitor/monitorSet'
    });
}

function changeOrg() {
    $.ajax({
        type: "post",
        url: "<%=path%>/monitor/getOrgBySetted",
        data: {},
        dataType: "json",
        success: function (result) {
            var setting = {
                check: {
                    enable: true,
                    chkDisabledInherit: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            };
            var zNodes = result.obj;
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    });
};

function OrgSearch(count0rg,num){
	reflushMonitor();
}

function reflushMonitor() {
//  var param =$.serializeObject($('#farmData'));
    var obj = document.getElementById("enableMonitorSet");
    var param;
//    var farmList = $("#farmId").val();
//    var houseList = $("#houseId").val();
//    if ($("#farmId").val() == "" && $("#houseId").val() == "" && !obj.checked) {
//        param = {"checked":"false"};
//    } else if ($("#farmId").val() == "" && $("#houseId").val() != "" && !obj.checked) {
//        param = {"houseId": houseList,"checked":"false"};
//    } else if ($("#farmId").val() != "" && $("#houseId").val() == "" && !obj.checked) {
//        param = {"farmId": farmList, "checked":"false"};
//    } else 
    	if (!obj.checked) {
        param = {"farmId": $("#orgId"+(count0rg-1)).val().split(",")[1],
//        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
        		"checked":"false"
        			};
    } else if (obj.checked) {
        param = {"farmId": $("#orgId"+(count0rg-1)).val().split(",")[1], 
//        		"houseId": $("#orgId"+count0rg).val().split(",")[1], 
        		"checked":"true"};
    }
    var obj = document.getElementById("enableMonitorSet");
    if (obj.checked) {
        document.getElementById("orgId"+(count0rg-1)).disabled = true;
        document.getElementById("orgId"+count0rg).disabled = true;
    } else {
        document.getElementById("orgId"+(count0rg-1)).disabled = false;
        document.getElementById("orgId"+count0rg).disabled = false;
    }
    $.ajax({
        // async: true,
        url: path + "/monitor/reflushMonitor",
        data: param,
        type: "POST",
        dataType: "json",
        cache: false,
        success: function (result) {
//            var list = eval(result.obj);
        	var obj = result.obj;
            initTable("tbodyMonitorCurList", createTableColumns(), []);
            var dataJosn = $.parseJSON(JSON.stringify(obj));
            $("#tbodyMonitorCurListTable").bootstrapTable('load',dataJosn);
//            $("#tbodyMonitorCurList tr").remove();
//            for (var i = 0; i < list.length; i++) {
//                var str = '';
//                var strTemp = "siMenu('z201','lm2','se2','op2','温湿度曲线图','/temProfile/showTemProfile?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id']  + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
//                var strHumidity = "siMenu('z201','lm2','se2','op2','温湿度曲线图','/humidityReport/showHumidityReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
//                var strLux = "siMenu('z207','lm2','se2','op2','光照曲线图','/lightReport/showLightReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
//                var strCarbon = "siMenu('z204','lm2','se2','op2','二氧化碳曲线图','/carbonReport/showCarbonReport?farm_id=" + list[i]['farm_id'] + "&house_id=" + list[i]['house_id'] + "&batch_no=" + list[i]['batch_no'] + "')><a href='javascript:void(0);'";
//                str += "<tr align='center' style='height:30px' >";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["farm_name"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["house_name"] + "</td>";
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["date_age"] + "</td>";
//                if (list[i]["alarm_code"] == '正常') {
//                    str += "<td style='height:30px;text-align: center;'>" + list[i]["alarm_code"] + "</a></td>";
//                } else {
//                    str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["alarm_code"] + "</a></td>";
//                }
//
//                if (list[i]["inside_set_temp"] == -99) {
//                	str += "<td style='height:30px;text-align: center;border-left: 2px solid #b4cef8;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                    str += "<td style='height:30px;text-align: center;border-left: 2px solid #b4cef8;' onclick=" + strTemp + ">" + list[i]["inside_set_temp"] + "</a></td>";
//                }
//                if (list[i]["outside_temp"] == -99) {
//                    str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                    str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["outside_temp"] + "</a></td>";
//                }
//                if (list[i]["inside_avg_temp"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_avg_temp"] + "</a></td>";
//                }
//                if (list[i]["point_temp_diff"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["point_temp_diff"]>list[i]["point_alarm"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["point_temp_diff"] + "</a></td>";
//                    } else if(list[i]["point_alarm"]-list[i]["point_temp_diff"] >0 && list[i]["point_alarm"]-list[i]["point_temp_diff"] <=1){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["point_temp_diff"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + (list[i]["point_temp_diff"] != null ? list[i]["point_temp_diff"] : '' ) + "</a></td>";	
//                    }
//                }
//                if (list[i]["inside_temp1"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["inside_temp1"]<list[i]["low_alarm_temp"] || list[i]["inside_temp1"]>list[i]["high_alarm_temp"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp1"] + "</a></td>";
//                    } else if((list[i]["inside_temp1"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp1"]-list[i]["low_alarm_temp"] <=1) 
//                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp1"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp1"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp1"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp1"] + "</a></td>";	
//                    }
//                }
//                if (list[i]["inside_temp2"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["inside_temp2"]<list[i]["low_alarm_temp"] || list[i]["inside_temp2"]>list[i]["high_alarm_temp"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp2"] + "</a></td>";
//                    } else if((list[i]["inside_temp2"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp2"]-list[i]["low_alarm_temp"] <=1) 
//                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp2"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp2"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp2"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp2"] + "</a></td>";	
//                    }
//                }
//                if (list[i]["inside_temp10"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["inside_temp10"]<list[i]["low_alarm_temp"] || list[i]["inside_temp10"]>list[i]["high_alarm_temp"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp10"] + "</a></td>";
//                    } else if((list[i]["inside_temp10"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp10"]-list[i]["low_alarm_temp"] <=1) 
//                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp10"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp10"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp10"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp10"] + "</a></td>";	
//                    }
//                }
//                if (list[i]["inside_temp19"] == -99) {
//                	str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["inside_temp19"]<list[i]["low_alarm_temp"] || list[i]["inside_temp19"]>list[i]["high_alarm_temp"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp19"] + "</a></td>";
//                    } else if((list[i]["inside_temp19"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp19"]-list[i]["low_alarm_temp"] <=1) 
//                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp19"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp19"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp19"] + "</a></td>";
//                    }else{
//                    	str += "<td style='height:30px;text-align: center;border-right: 2px solid #b4cef8;' onclick=" + strTemp + ">" + list[i]["inside_temp19"] + "</a></td>";
//                    }
//                }
//                if (list[i]["inside_temp20"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["inside_temp20"]<list[i]["low_alarm_temp"] || list[i]["inside_temp20"]>list[i]["high_alarm_temp"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["inside_temp20"] + "</a></td>";
//                    } else if((list[i]["inside_temp20"]-list[i]["low_alarm_temp"] >0 && list[i]["inside_temp20"]-list[i]["low_alarm_temp"] <=1) 
//                    		|| (list[i]["high_alarm_temp"]-list[i]["inside_temp20"] >0 && list[i]["high_alarm_temp"]-list[i]["inside_temp20"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["inside_temp20"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["inside_temp20"] + "</a></td>";	
//                    }
//                }
//                if (list[i]["inside_humidity"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + "-" + "</td>";
//                } else {
//                str += "<td style='height:30px;text-align: center;' onclick=" + strHumidity + ">" + list[i]["inside_humidity"] + "</a></td>";
//                }
//                if (list[i]["lux"] == -99) {
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strLux + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["lux"]<list[i]["low_lux"] || list[i]["lux"]>list[i]["high_lux"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["lux"] + "</a></td>";
//                    } else if((list[i]["lux"]-list[i]["low_lux"] >0 && list[i]["lux"]-list[i]["low_lux"] <=1) 
//                    		|| (list[i]["high_lux"]-list[i]["lux"] >0 && list[i]["high_lux"]-list[i]["lux"] <=1)){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["lux"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["lux"] + "</a></td>";	
//                    }
//                }
//                if (list[i]["co2"] == 0 || list[i]["co2"] == -99) {
//                    str += "<td style='height:30px;text-align: center;' onclick=" + strCarbon + ">" + "-" + "</td>";
//                } else {
//                	if (list[i]["co2"]>list[i]["high_alarm_co2"]) {
//                		str += "<td style='height:30px;text-align: center;color: #fff;background-color: #E83828 !important;'>" + list[i]["co2"] + "</a></td>";
//                    } else if(list[i]["high_alarm_co2"]-list[i]["co2"] >0 && list[i]["high_alarm_co2"]-list[i]["co2"] <=1){
//                    	str += "<td style='height:30px;text-align: center;color: #fff;background-color: #f5a623 !important;'>" + list[i]["co2"] + "</a></td>";
//                    }else{
//                	str += "<td style='height:30px;text-align: center;' onclick=" + strTemp + ">" + list[i]["co2"] + "</a></td>";	
//                    }
//                }
//                str += "<td style='height:30px;text-align: center;'>" + list[i]["collect_datetime"] + "</td>";
//                $("#tbodyMonitorCurList").append(str);
//            }

        }
    });
     setTimeout("javascript:reflushMonitor();", 60000); //10s刷新一次
}

function reflushMonitor2() {
    var param;
    if ($("#farmId").val() == "") {
        param = null;
    } else {
        param = {"farmId": $("#farmId").val()};
    }

    $.ajax({
        // async: true,
        url: path + "/monitor/reflushMonitor2",
        data: param,
        type: "POST",
        dataType: "json",
        cache: false,
        // timeout:50000,
        success: function (result) {
            var list = result.obj;
            $("#houseId option:gt(0)").remove();
            for (var i = 0; i < list.length; i++) {
                $("#houseId").append("<option value=" + list[i].id + ">" + list[i].house_name + "</option>");
            }
            reflushMonitor();
        }
    });
}

/****弹出启用监控设置窗口*****/
// function openMonitorSettingWin(){
//	if (isRead == 0) {
//		layer.alert('无权限，请联系管理员!', {
//			skin : 'layui-layer-lan',
//			closeBtn : 0,
//			shift : 4
//		// 动画类型
//		});
//		return;
//	}
// var str = '<div style="float: left;padding-left: 0px;">';
// 	str += '<div class="zTreeDemoBackground left" style="border:1px solid #FFFFFF; overflow:auto;>';
// 	str += '<ul id="treeDemo" class="ztree"></ul></div>';
//	str += '<div style="padding-left: 0px;float:left;width: 100%; text-align: center" >';
//    str += '<button type="button" class="btn blue" onclick="addMonitorSet()"><i class="icon-ok"></i>&nbsp;确 定&nbsp;&nbsp;&nbsp;</button>';
//	str += '&nbsp;&nbsp;&nbsp;&nbsp;';
//		str += '<button type="button" class="btn" onclick="closeB()">&nbsp;&nbsp;&nbsp;取 消&nbsp;&nbsp;&nbsp;</button>';
//      str+='</div>';
//
// layer.open({
// 	  type: 1,
// 	  skin: 'layui-layer-lan', //加上边框
// 	  area: ['570px', '465px'], //宽高
// 	  content: str,
// 	  btn: ['确定','取消'],
// 	  yes: function(index){
// 		  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
// 		    var nodes = treeObj.getCheckedNodes(true);
// 		    var v = new Array();
// 		    for (var i = 0; i < nodes.length; i++) {
// 		        v.push(nodes[i].id);
// 		    }
// 		    $.ajax({
// 		        url: "<%=path%>/monitor/saveSet",
// 		        data: {
// 		            "groupId" : v.toString()
// 		        },
// 		        type: "POST",
// 		        dataType: "json",
// 		        success: function (result) {
// 		            if (result.msg == '1') {
// 		                parent.layer.closeAll();
// 		                parent.location.reload();
// 		                var enableMonitorSet = parent.document.getElementById("enableMonitorSet");
// 		                if (enableMonitorSet.checked == true){
// 		                    reflushMonitor();
// 		                }
// 		            } else {
// 		                alert("添加失败！");
// 		            }
// 		        }
// 		    });
// 	  }
// 	});

//创建表格
function createTable(tabName,dataList){
    initTable("tbodyMonitorCurList", createTableColumns(), []);
};

//实时监测列表
function createTableColumns(){
    var dataColumns = [
                       [{   
					        title: '<img src="'+path +'/modules/monitor/image/farm.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/Shape.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/Fill 203.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/Group 9.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/goal.png" style="width: 38px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/out.png" style="width: 38px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/avg.png" style="width: 38px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/pointTemp.png" style="width: 38px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/temp_1.png" style="width: 38px;height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{
					        title: '<img src="'+path +'/modules/monitor/image/temp_2.png" style="width: 38px;height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/temp_3.png" style="width: 38px;height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/temp_4.png" style="width: 38px;height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/temp_5.png" style="width: 38px;height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/humidity.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/co2.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/light.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    },{   
					        title: '<img src="'+path +'/modules/monitor/image/Fill 166.png" style="width: 25px; height: 25px;" />',
					        colspan: 1,
					        align: 'center'
					    }],
                       [{field: "farm_name",
                            title: "农场",
                            width: '12%',
                            sortable: true
                        }, {
                            field: "house_name",
                            title: "栋舍",
                            width: '5%',
                            sortable: true
                        }, {
                            field: "date_age",
                            title: "日龄",
                            width: '3%',
                            sortable: true
                        }, {
                            field: "alarm_code",
                            title: "状态",
                            width: '10%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	if (value=='正常') {
                            		return {};
                                }else{
                                	return {css:{"background-color": "#E83828"}};
                                }
                        },
                            formatter: function(value,row,index){
	                            if (value == '正常') {
	                            	return value;
	                              } else {
	                            	return '<a href="#" style="color: #fff;" onclick="forwardMenu(\'z102\',\'lm2\',\'se2\',\'op2\',\'实时报警\',\'/alarmCurr/showAlarmCurr?farm_id=' + row.farm_id +'&corporation_id='+row.corporation_id +'\')">'+value+'</a>';
	                          }
                            }
                        }, {
                            field: "inside_set_temp",
                            title: "目标",
                            width: '5%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#c6f7db"}};
                        },
                            formatter: function(value,row,index){
                            	if (value == '-') {
                            		return '<a href="#" onclick="forwardMenu(\'z103\',\'lm2\',\'se2\',\'op2\',\'报警设置\',\'/alarm/showAlarm?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&corporation_id='+row.corporation_id + '\')">'+'-'+'</a>';
                                } else {
                                	return '<a href="#" onclick="forwardMenu(\'z103\',\'lm2\',\'se2\',\'op2\',\'报警设置\',\'/alarm/showAlarm?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no  +'&tabId=0' +'&corporation_id='+row.corporation_id + '\')">'+value+'</a>';
                                }
                            }
                        },  {
                            field: "outside_temp",
                            title: "室外",
                            width: '5%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#c6f7db"}};
                        },
                            formatter: function(value,row,index){
                            	if (value == '-') {
                            		return '<a href="#" onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id + '\')">'+'-'+'</a>';
                                } else {
                                	return '<a href="#" onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no  +'&tabId=0' +'&org_id='+row.corporation_id + '\')">'+value+'</a>';
                                }
                            }
                        }, {
                            field: "inside_avg_temp",
                            title: "平均",
                            width: '5%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#c6f7db"}};
                        },
                            formatter: function(value,row,index){
                            	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id + '\')"');
//                            	if (value == -99) {
//                            		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                                } else {
//                                	if (value<row.low_alarm_temp || value>row.high_alarm_temp) {
//                                		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }else if((value-row.low_alarm_temp >0 && value-row.low_alarm_temp <=1) 
//                                    		|| (row.high_alarm_temp-value >0 && row.high_alarm_temp-value <=1)){
//                                    	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                	else{
//                                    	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                    }
//                                }
                            }
                        },  {
                            field: "point_temp_diff",
                            title: "点温差",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                                	if (row.point_temp_diff>row.point_alarm) {
//                                		return {css:{"background-color": "#E83828"}};
//                                    } else if(row.point_alarm-row.point_temp_diff >0 && row.point_alarm-row.point_temp_diff <=1){
//                                    	return {css:{"background-color": "#f5a623"}};
//                                    }else{
//                                    	return {};
//                                    }
//                            },
                            cellStyle:function(value, row, index) {
                            		return {css:{"background-color": "#c6f7db"}};
                        },
                            formatter: function(value,row,index){
                            	if(row.point_alarm == 0){
                            		return '<a href="#" onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=1' +'&org_id='+row.corporation_id +  '\')">'+value+'</a>';
                            	}
                            	return colorSelect(value,'-','-',row.point_alarm,'-','onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=1' +'&org_id='+row.corporation_id +  '\')"');
//                            	if (row.point_temp_diff == -99) {
//                            		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                                } else {
//                                	if (row.point_temp_diff>row.point_alarm) {
//                                		return '<a href="#" style="color:#E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }else if(row.point_alarm-row.point_temp_diff >0 && row.point_alarm-row.point_temp_diff <=1){
//                                    	return '<a href="#" style="color:#f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                	else{
//                                    	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                }
                            }
                        }, {
                            field: "inside_temp1",
                            title: "前区1",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                                	if (row.inside_temp1<row.low_alarm_temp || row.inside_temp1>row.high_alarm_temp) {
//                                		return {css:{"background-color": "#E83828"}};
//                                    } else if((row.inside_temp1-row.low_alarm_temp >0 && row.inside_temp1-row.low_alarm_temp <=1) 
//                                    		|| (row.high_alarm_temp-row.inside_temp1 >0 && row.high_alarm_temp-row.inside_temp1 <=1)){
//                                    	return {css:{"background-color": "#f5a623"}};
//                                    }else{
//                                    	return {};
//                                    }
//                                
//                        },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#e8f0c5"}};
                        },
                            formatter: function(value,row,index){
                            	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id +  '\')"');
//                            	if (row.inside_temp1 == -99) {
//                            		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                                } else {
//                                	if (row.inside_temp1<row.low_alarm_temp || row.inside_temp1>row.high_alarm_temp) {
//                                		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }else if((row.inside_temp1-row.low_alarm_temp >0 && row.inside_temp1-row.low_alarm_temp <=1) 
//                                    		|| (row.high_alarm_temp-row.inside_temp1 >0 && row.high_alarm_temp-row.inside_temp1 <=1)){
//                                    	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                	else{
//                                    	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                    }
//                                }
                            }
                        }, {
                            field: "inside_temp2",
                            title: "前区2",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                            	if (row.inside_temp2<row.low_alarm_temp || row.inside_temp2>row.high_alarm_temp) {
//                            		return {css:{"background-color": "#E83828"}};
//                                } else if((row.inside_temp2-row.low_alarm_temp >0 && row.inside_temp2-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp2 >0 && row.high_alarm_temp-row.inside_temp2 <=1)){
//                                	return {css:{"background-color": "#f5a623"}};
//                                }else{
//                                	return {};
//                                }
//                            
//                    },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#e8f0c5"}};
                        },
                        formatter: function(value,row,index){
                        	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id +  '\')"');
//                        	if (row.inside_temp2 == -99) {
//                        		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                            } else {
//                            	if (row.inside_temp2<row.low_alarm_temp || row.inside_temp2>row.high_alarm_temp) {
//                            		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }else if((row.inside_temp2-row.low_alarm_temp >0 && row.inside_temp2-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp2 >0 && row.high_alarm_temp-row.inside_temp2 <=1)){
//                                	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }
//                            	else{
//                                	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                }
//                            }
                        }
                        }, {
                            field: "inside_temp10",
                            title: "中区",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                            	if (row.inside_temp10<row.low_alarm_temp || row.inside_temp10>row.high_alarm_temp) {
//                            		return {css:{"background-color": "#E83828"}};
//                                } else if((row.inside_temp10-row.low_alarm_temp >0 && row.inside_temp10-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp10 >0 && row.high_alarm_temp-row.inside_temp10 <=1)){
//                                	return {css:{"background-color": "#f5a623"}};
//                                }else{
//                                	return {};
//                                }
//                            
//                    },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#e8f0c5"}};
                        },
                        formatter: function(value,row,index){
                        	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id +  '\')"');
//                        	if (row.inside_temp10 == -99) {
//                        		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                            } else {
//                            	if (row.inside_temp10<row.low_alarm_temp || row.inside_temp10>row.high_alarm_temp) {
//                            		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }else if((row.inside_temp10-row.low_alarm_temp >0 && row.inside_temp10-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp10 >0 && row.high_alarm_temp-row.inside_temp10 <=1)){
//                                	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }
//                            	else{
//                                	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                }
//                            }
                        }
                        }, {
                            field: "inside_temp19",
                            title: "后区1",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                            	if (row.inside_temp19<row.low_alarm_temp || row.inside_temp19>row.high_alarm_temp) {
//                            		return {css:{"background-color": "#E83828"}};
//                                } else if((row.inside_temp19-row.low_alarm_temp >0 && row.inside_temp19-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp19 >0 && row.high_alarm_temp-row.inside_temp19 <=1)){
//                                	return {css:{"background-color": "#f5a623"}};
//                                }else{
//                                	return {};
//                                }
//                            
//                    },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#e8f0c5"}};
                        },
                        formatter: function(value,row,index){
                        	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id +  '\')"');
//                        	if (row.inside_temp19 == -99) {
//                        		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                            } else {
//                            	if (row.inside_temp19<row.low_alarm_temp || row.inside_temp19>row.high_alarm_temp) {
//                            		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }else if((row.inside_temp19-row.low_alarm_temp >0 && row.inside_temp19-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp19 >0 && row.high_alarm_temp-row.inside_temp19 <=1)){
//                                	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }
//                            	else{
//                                	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                }
//                            }
                        }
                        }, {
                            field: "inside_temp20",
                            title: "后区2",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (value == -99) {
//                            		return {};
//                            	}else
//                            	if (row.inside_temp20<row.low_alarm_temp || row.inside_temp20>row.high_alarm_temp) {
//                            		return {css:{"background-color": "#E83828"}};
//                                } else if((row.inside_temp20-row.low_alarm_temp >0 && row.inside_temp20-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp20 >0 && row.high_alarm_temp-row.inside_temp20 <=1)){
//                                	return {css:{"background-color": "#f5a623"}};
//                                }else{
//                                	return {};
//                                }
//                            
//                    },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#e8f0c5"}};
                        },
                        formatter: function(value,row,index){
                        	return colorSelect(value,row.low_alarm_temp,row.low_temp_warning,row.high_alarm_temp,row.high_temp_warning,'onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id + '\')"');
//                        	if (value == -99) {
//                        		return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                            } else {
//                            	if (row.inside_temp20<row.low_alarm_temp || row.inside_temp20>row.high_alarm_temp) {
//                            		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }else if((row.inside_temp20-row.low_alarm_temp >0 && row.inside_temp20-row.low_alarm_temp <=1) 
//                                		|| (row.high_alarm_temp-row.inside_temp20 >0 && row.high_alarm_temp-row.inside_temp20 <=1)){
//                                	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                }
//                            	else{
//                                	return '<a href="#" onclick="siMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'温湿度曲线图\',\'/temProfile/showTemProfile?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';	
//                                }
//                            }
                        }
                        }, {
                            field: "inside_humidity",
                            title: "湿度",
                            width: '5%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#f1e1ff"}};
                        },
                            formatter: function(value,row,index){
                            	if (value == '-') {
                            		return '<a href="#" onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0'+'&org_id='+row.corporation_id +  '\')">'+'-'+'</a>';
                                } else {
                                	return '<a href="#" onclick="forwardMenu(\'z201\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=0' +'&org_id='+row.corporation_id +  '\')">'+value+'</a>';
                                }
                            }
                        }, {field: "co2",
                            title: "CO2",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (row.co2 == 0 || row.co2 == -99) {
//                            		return {};
//                            	}else
//                              	if (row.co2>row.high_alarm_co2) {
//                              		return {css:{"background-color": "#E83828"}};
//                                  } else if(row.high_alarm_co2-row.co2 >0 && row.high_alarm_co2-row.co2 <=1){
//                                	  return {css:{"background-color": "#f5a623"}};
//                                  }else{
//                                  	return {};
//                                  }
//                        
//                },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#f1e1ff"}};
                        },
                        formatter: function(value,row,index){
                        	return colorSelect(value,'-','-',row.high_alarm_co2,row.high_co2_warning,'onclick="forwardMenu(\'z204\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=2' +'&org_id='+row.corporation_id +  '\')"');
//                        	if (row.co2 == 0 || row.co2 == -99) {
//                        		return '<a href="#" onclick="siMenu(\'z204\',\'lm2\',\'se2\',\'op2\',\'二氧化碳曲线图\',\'/carbonReport/showCarbonReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                          } else {
//                          	if (row.co2>row.high_alarm_co2) {
//                          		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z204\',\'lm2\',\'se2\',\'op2\',\'二氧化碳曲线图\',\'/carbonReport/showCarbonReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                              }else if(row.high_alarm_co2-row.co2 >0 && row.high_alarm_co2-row.co2 <=1){
//                            	  return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z204\',\'lm2\',\'se2\',\'op2\',\'二氧化碳曲线图\',\'/carbonReport/showCarbonReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';  
//                              }
//                          	else{
//                            	  return '<a href="#" onclick="siMenu(\'z204\',\'lm2\',\'se2\',\'op2\',\'二氧化碳曲线图\',\'/carbonReport/showCarbonReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                              }
//                          }
                        }
                        }, {field: "lux",
                            title: "光照",
                            width: '5%',
                            sortable: true,
//                            cellStyle:function(value, row, index) {
//                            	if (row.lux == -99) {
//                            		return {};
//                            	}else
//                                	if (row.lux<row.low_lux || row.lux>row.high_lux) {
//                                		return {css:{"background-color": "#E83828"}};
//                                    } else if((row.lux-row.low_lux >0 && row.lux-row.low_lux <=1) 
//                                    		|| (row.high_lux-row.lux >0 && row.high_lux-row.lux <=1)){
//                                    	return {css:{"background-color": "#f5a623"}};
//                                    }else{
//                                    	return {};
//                                    }
//                            
//                    },
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#f1e1ff"}};
                        },
                            formatter: function(value,row,index){
                            	
                            	return colorSelect(value,row.low_lux,row.low_lux_warning,row.high_lux,row.high_lux_warning,'onclick="forwardMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&tabId=3' +'&org_id='+row.corporation_id +  '\')"');
//                            	if (row.lux == -99) {
//                            		return '<a href="#" onclick="siMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'光照曲线图\',\'/lightReport/showLightReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+'-'+'</a>';
//                                } else {
//                                	if (row.lux<row.low_lux || row.lux>row.high_lux) {
//                                		return '<a href="#" style="color: #E83828;" onclick="siMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'光照曲线图\',\'/lightReport/showLightReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }else if((row.lux-row.low_lux >0 && row.lux-row.low_lux <=1) 
//                                    		|| (row.high_lux-row.lux >0 && row.high_lux-row.lux <=1)){
//                                    	return '<a href="#" style="color: #f5a623;" onclick="siMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'光照曲线图\',\'/lightReport/showLightReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                     else{
//                                    	return '<a href="#" onclick="siMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'光照曲线图\',\'/lightReport/showLightReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no + '\')">'+value+'</a>';
//                                    }
//                                }
                            	
                            }
                        }, {field: "collect_datetime",
                            title: "时间",
                            width: '5%',
                            sortable: true,
                            cellStyle:function(value, row, index) {
                            	return {css:{"background-color": "#f1e1ff"}};
                        },
                            formatter: function(value,row,index){
                            	// return '<a href="#" onclick="forwardMenu(\'z208\',\'lm2\',\'se2\',\'op2\',\'报警统计分析\',\'/alarmHist/showAlarmHist?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no +'&corporation_id='+row.corporation_id + '\')">'+value+'</a>';
                                return '<a href="#" onclick="forwardMenu(\'z207\',\'lm2\',\'se2\',\'op2\',\'环境监测分析\',\'/surroundingsReport/showSurroundingsReport?farm_id=' + row.farm_id + '&house_id=' + row.house_id  + '&batch_no=' + row.batch_no  +'&tabId=4' +'&org_id='+row.corporation_id +  '\')">'+value+'</a>';
                            }
                        }]];
    return dataColumns;
};


function colorSelect(mb,db,dbWarning,gb,gbWarning,h1){
	if (mb == '-') {
		return '<a href="#" style="color: #E83828;" '+h1+ '>'+'-'+'</a>';
    }else if(gb == '-'){
    	if(db == '-'){
    		return '<a href="#" '+h1+'>'+mb+'</a>';
    	}else{
    		if (parseFloat(mb)<=parseFloat(db)) {
        		return '<a href="#" style="color: #E83828;" '+h1+'>'+mb+'</a>';
            }else if(parseFloat(mb)-parseFloat(db) >0 && parseFloat(mb)-parseFloat(dbWarning) >=0){
            	return '<a href="#" style="color: #f5a623;" '+h1+'>'+mb+'</a>';
            }
             else{
            	return '<a href="#" '+h1+'>'+mb+'</a>';
            }
    	}
    }else if(db == '-'){
    	if (parseFloat(mb)>=parseFloat(gb)) {
    		return '<a href="#" style="color: #E83828;" '+h1+'>'+mb+'</a>';
        }else if(parseFloat(gb)-parseFloat(mb) >0 && parseFloat(gbWarning)-parseFloat(mb) <=0){
        	return '<a href="#" style="color: #f5a623;" '+h1+'>'+mb+'</a>';
        }
         else{
        	return '<a href="#" '+h1+'>'+mb+'</a>';
        }
    }
	else {
    	if (parseFloat(mb)<=parseFloat(db) || parseFloat(mb)>=parseFloat(gb)) {
    		return '<a href="#" style="color: #E83828;" '+h1+'>'+mb+'</a>';
        }else if((parseFloat(mb)-parseFloat(db) >0 && parseFloat(mb)-parseFloat(dbWarning) <=0) 
        		|| (parseFloat(gb)-parseFloat(mb) >0 && parseFloat(gbWarning)-parseFloat(mb) <=0)){
        	return '<a href="#" style="color: #f5a623;" '+h1+'>'+mb+'</a>';
        }
         else{
        	return '<a href="#" '+h1+'>'+mb+'</a>';
        }
    }
};







