<div class="topbar">
{% if passed == 1 %}
<ul>
<li class="fl"><a href="/user/index/">首页</a></li>
<li class="fl"><a href="/user/history/">攻击历史</a></li>
<li class="fl"><a href="/user/result/">攻击结果</a></li>
<li class="fl"><a href="/user/task/">所有任务</a></li>
<li class="fl"><a href="/admin/showAdminLog/">日志查看</a></li>
{% endif %}
{% if passed == 2 %}
<ul>
<li class="fl"><a href="/admin/showUserList/">首页</a></li>
<li class="fl"><a href="/admin/showUserList/">用户管理</a></li>
<li class="fl"><a href="/admin/showAdminLog/">登录历史</a></li>
<li class="fl"><a href="/admin/showAdminAttack/">攻击记录</a></li>
{% endif %}
<li class="fr"><a href="/login/logout/">退出</a></li>
</ul>
</div>