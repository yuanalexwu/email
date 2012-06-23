{% extends 'base/base_login.tpl' %}
{% block title %}{{ title }}{% endblock %}
{% block style %}
#content{
	width:500px;
	overflow:hidden;
	margin:0px auto;
}
table{
	border-collapse:collapse;
}
table,td{
	border:1px solid black;
}
td{
    width:300px;
    height:20px;
    text-align:center;
}
.title_tr{
	font-weight:700;
	color:black;
}​
.tr_color1{
	background-color:#D7D7D7;
}
.tr_color2{
	background-color:#D7D7D7;
}
{% endblock %}
{% block content %}
<div id="content">
<div id="btn_toolbar">
<input type="button" value="添加" style="float:left;"/>
<input type="button" value="删除" style="float:left;"/>
<input type="button" value="全选/全不选" flag="0" style="float:right;"/>
</div>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
<div id="content_list">
{% include 'admin/user_list.tpl' %}
</div>
{% endblock %}
{% block js %}
{% include 'admin/admin_manage_js.js' %}
{% endblock %}