$(function(){
	//绑定用户按钮操作事件
	$add = '';
	$del = '';
	$select = '';
	jQuery.each($("#btn_toolbar input"),function(index){
		if(index == 0){$add = $(this);}
		if(index == 1){$del = $(this);}
		if(index == 2){$select = $(this);}
	});
	//绑定全局添加，删除，全选按钮单击时间
	$add.bind("click",function(event){
		$mask = mask();
		//弹出添加框
		showEditBox(1,0,0,0,$mask);
	});
	//删除按钮
	$del.bind("click",function(event){
		jqueryList = {};
		jqueryList.idArry = [];
		i = 0;
		jQuery.each($("#content_list [name=items]:checkbox"),function(index){
			if(this.checked){
				i = i+1;
				jqueryList.idArry.push($(this).attr('v'))
			}
		});
		//没有选择删除用户，直接返回
		if(i == 0){
			alert("请选择需要删除的用户!");
			return false;
		}
		$mask = mask();
		//弹框
		if(confirm("确认删除?")){
			$.ajax({
			type:"GET",
			url:"/admin/del/",
			data:{idarry:jqueryList.idArry},
			dataType:"html",
			success:success,
			error:error
		})
		}else{
			$mask.remove()
		}
	});
	//全选/全不选
	$select.bind("click",function(event){
		flag = $(this).attr("flag");
		if(flag == "0"){
			$("#content_list [name=items]:checkbox").attr("checked",true);
			$(this).attr("flag","1");
		}else{
			$("#content_list [name=items]:checkbox").attr("checked",false);
			$(this).attr("flag","0");
		}
	});
	
	//绑定用户名超链接单击事件
	function bound_a(){
		$(".list_table a").bind("click",function(envent){
			$a = $(this);
			id = $a.attr("v");
			name = $a.attr("n");
			power = $a.attr("p");
			$mask = mask();
			//弹出修改框
			showEditBox(2,id,name,power,$mask);
			return false;
		})
	}
	bound_a();
	
	//屏蔽蒙板
	function mask(){
		//屏蔽正文内容
		maskHtml = '<div id="mask"></div>';
		$("body").append(maskHtml);
		$mask = $("#mask");//$mask
		$mask.css({"opacity":"0.5","background-color":"#cccccc","width":"100%","height":"100%","position":"absolute","z-index":"2","left":"0px","top":"0px"});
		return $mask;
	}
	
	//修改窗口
	function showEditBox(flag,id,name,power,$mask){
		//flag 1:添加 2:修改
		//显示修改框
		boxHtml = "";
		if(flag==1){
			boxHtml = '<div id="editbox"><div style="margin:10px"><input type="hidden" value=""/>名称：<input value=""/><br>密码：<input value=""/><br>权限：<input value=""/>*0:普通&nbsp;1:管理员<br><br><input id="update_btn" type="button" value="添加"/>&nbsp;&nbsp;<input id="cancel_btn" type="button" value="取消"/></div></div>';
		}
		if(flag==2){
			boxHtml = '<div id="editbox"><div style="margin:10px"><input type="hidden" value="'+id+'"/>名称：<input value="'+name+'"/><br>密码：<input value=""/><br>权限：<input value="'+power+'"/>*0:普通&nbsp;1:管理员<br><br><input id="update_btn" type="button" value="修改"/>&nbsp;&nbsp;<input id="cancel_btn" type="button" value="取消"/></div></div>';
		}
		$("body").append(boxHtml);
		$box = $("#editbox");
		//添加样式
		margin_left = $("body").width()/2-300/2;
		$box.css({"width":"320px","height":"150px","backgroundColor":"#C63F3F","border":"3px solid #7B6533","margin":"auto auto","top":"120px","left":margin_left+"px","z-index":"3","position":"absolute"});
		
		//绑定按钮事件
		
		//取消按钮事件
		$("#cancel_btn").bind("click",function(event){
			$box.remove();
			$mask.remove();
		})
		
		//修改按钮事件
		$("#update_btn").bind("click",function(event){
			$input = $("#editbox div input:text");
			name = "";
			pwd = "";
			power = "";
			jQuery.each($input,function(index){
				v = $(this).attr("value")
				if(index==0){name=v;}
				if(index==1){pwd=v;}
				if(index==2){power=v;}
				//密码确认校验
				//T0D0 权限 0 1 js校验
			});
			if(flag==1){//添加
				id = 0;//无id
				doEdit(id,name,pwd,power,$box,$mask,flag=1);
			}
			if(flag==2){//修改
				doEdit(id,name,pwd,power,$box,$mask,flag=2);
			}
		})
	}
	
	//修改用户信息
	function doEdit(id,name,pwd,power,$box,$mask,flag){
		//修改对话框为等待响应
		url = '';
		if(flag==1){url='/admin/append/'}
		if(flag==2){url='/admin/edit/'}
		$box.html("<h2>请稍候...</h2>");
		$.ajax({
			type:"GET",
			url:url,
			data:{id:id,name:name,pwd:pwd,power:power},
			dataType:"html",
			success:success,
			error:error
		})
	}
	
	//ajax成功
	function success(data){
		//加载新的用户信息
		$content_list = $("#content_list");
		$content_list.html(data);
		bound_a();//页面信息返回需重新绑定单击事件
		
		//去除对话框，蒙板
		$("#editbox").remove();
		$("#mask").remove();
		alert("操作成功!");
		
	}
	
	//ajax失败
	function error(data){
		//去除对话框，蒙板
		$("#editbox").remove();
		$("#mask").remove();
		alert("更新失败，请重新操作");	
	}
	
	
})
