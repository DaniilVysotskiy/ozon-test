$(function() {

	let wrapper = $('.container');
	let loader = $('.loader')
	let cols = $('.col');

	$.ajax({
      url: 'https://api.instagram.com/v1/users/691623/media/recent?access_token=691623.1419b97.479e4603aff24de596b1bf18891729f3',
      type: 'GET',
      dataType: 'jsonp',
      error: function(err) {
        console.log('error', err);
      },
      success: fetchData,
	 });

	function fetchData(data) {
		loader.remove();
		let elem = data.data;
		let cnt = 0;
		
		for (let i = 0; i < elem.length; i++) {
			let card = '';
			card = `
				<div class="card">
					<div class="card__header">
						<div class="user">
							<div class="user__avatar">
								<img src=" ${elem[i].user.profile_picture} " alt="${elem[i].user.full_name}">
							</div>
							<div class="user__info">
								<div class="user__name"> ${elem[i].user.full_name} </div>
								<div class="user__place"> ${elem[i].location === null ? '' : elem[i].location.name} </div>
							</div>
						</div>
						<div class="time">5d</div>
					</div>
					<div class="card__pic">
						<img src=" ${elem[i].images.standard_resolution.url} " alt="Picture">
					</div>
					<div class="card__info">
						<div class="card__like">
							<button data-id=" ${elem[i].id} " class="like"></button>
							<span> ${elem[i].likes.count} </span>
						</div>
						<div class="card__comment">
							<p>
								${elem[i].caption === null ? '' : elem[i].caption.text}
							</p>
						</div>
					</div>
				</div>
			`;

			if(cnt <= 2){
				$(cols.get(cnt)).append(card);
				cnt++;
			} else {
				$(cols.get(cnt)).append(card);
				cnt = 0;
			}
		}

	}

	$(document).on('click', '.like', function(){
		let id = $(this).data('id');
		alert('id:' + id);
	})


});
