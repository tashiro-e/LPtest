jQuery(function($){

	$contactForm = $('#contact-form');

	// バリデーション

	// JSONデータ送信
	$contactForm.submit(function(ev) {
		ev.preventDefault();

		var data = {
			contact_type: $('input[name="contact_type"]').val(),
			nickname: $('input[name="nickname"]').val(),
			xxx: [{
				xxxx: $('input[name="address.postcode"]').val(),
				xxxx: $('input[name="address.prefecture"]').val(),
			}]
		}

		$.ajax({
			method: "POST",
			url: "https://jsonplaceholder.typicode.com/posts", //ダミーに使えるオンラインサービスURL
			// url: "./receive.php",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data)
		})
		.done(function(data) {
			alert(JSON.stringify(data));
			window.location.href = "/contact/thankyou/";
		})
		.fail(function(err) {
			window.location.href = "/contact/error/";
		});
	});
});



jQuery('input.validate, textarea.validate, select.validate').each(function () {
    $this = jQuery(this);

    //バリデーション

  // --- JSONデータ送信 ---
  var originalData = {
    family_name: jQuery('input[name="family_name"]').val(), //お名前（姓）
    first_name: jQuery('input[name="first_name"]').val(), //お名前（名）
  };

	// 外部フォームへの送信処理
    jQuery
      .ajax({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(originalData),
      })
      .done(function (apiResponse) {
        sendEmail(originalData);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        window.location.href = homeurl + 'contact/error/';
      });

  // メール送信
  function sendEmail(data) {
    jQuery.ajax({
        method: "POST",
        url: "/sendmail/index.php",
        data: data
    })
    .done(function(response) {
        window.location.href = 'contact/thankyou/';
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.location.href = 'contact/error/';
    });
  }
});

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
	event.preventDefault();

	const formData = new FormData(formEl);
	const data = Object.fromEntries(formData);

	fetch('https://reqres.in/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(error => console.log(error));
});

formEl.addEventListener('submit', event => {
	event.preventDefault();

	const formData = new FormData(formEl);
	const data = Object.fromEntries(formData);
	axios.post('https://reqres.in/api/users', data)
	.then(function (response) {
		console.log(response.data);
	})
	.catch(error => console.log(error));
});