const { ipcRenderer } = require('electron');
const path = require('path')
const api_url = '';
var current_time = '';
var stop_time = '';

var userName = '';
var psw = '';
var email = '';
var phone = '';
var tt_device = '';
$(document).ready(function () {
	const queryString = window.location.search;
	//console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	const page_name = urlParams.get('page')
	setInterval(function () {
		if (!navigator.onLine) {
			$('.internet_err').show();
		} else {
			$('.internet_err').hide();
		}
	}, 1000);


	/*$('#app_header').load("elements/header.html", function () {
		var init_data = [];
		init_data = { 'route': 'users', 'action': 'initView' };
		var initInfo = ipcRenderer.sendSync('initRoute', init_data);
		$('.head_shop_name').text(initInfo.username);
		$('.head_shop_name2').text(initInfo.username);
		$('#display_name').val(initInfo.username);
		console.log('deviceer444: ' + initInfo.device_id);
		tt_device = initInfo.device_id;

		userName = initInfo.username;
		psw = initInfo.password;
		email = initInfo.email;
		phone = initInfo.phone;

		var d1 = new Date();
		var d2 = new Date(initInfo.stop_date);
		current_time = d1.getTime();
		stop_time = d2.getTime();
		//console.log('d1: '+d1.getTime() +' d2: '+d2.getTime())
		$('.device_id').val(initInfo.device_id);
		$('.append_matches').data('device', initInfo.device_id);
		if (!initInfo.logo) {
			$('.head_shop_img').prop('src', '../assets/img/default_user.jpg');
			$('.head_shop_img2').prop('src', '../assets/img/default_user.jpg');
		} else {

		}
	})*/
	$('#sidenav-main').load("elements/sidebar.html");
	$('#app_footer').load("elements/footer.html")



	$(document).on('click', '.logout_me', function () {
		var logout_data = [];
		logout_data = { 'route': 'users', 'action': 'logoutMe' };
		var status = ipcRenderer.sendSync('initRoute', logout_data);
		if (status == 'done') {
			
			window.location.href = './login.html';
		} else {
			alert('We are getting some error. Please try after some time')
			return false;
		}
	})
	
	$(document).on("keypress", ".number", function (event) {
		if (
			(event.which != 46 || $(this).val().indexOf(".") != -1) &&
			(event.which < 48 || event.which > 57)
		) {
			event.preventDefault();
		}
	});

	$('.go_back').on('click', function () {
		window.history.back();
	})

	/**************Footer section**************/
	$('.main-footer').html('<strong>Copyright &copy; 2021 <a href="#">R S Live TV</a>.</strong> All rights reserved.<div class="float-right d-none d-sm-inline-block foot_version"><b>Version</b> 2.0.3</div>');


})

function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test($email);
}