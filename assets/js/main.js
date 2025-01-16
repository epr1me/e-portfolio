/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function (event) {
				var $this = $(this);
				var href = $this.attr('href');

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Handle local anchors (e.g., #section).
				if (href && href.charAt(0) === '#') {
					var id = href.substring(1); // Remove '#' to get the ID.
					var $section = $('#' + id); // Select the target section by ID.

					// Prevent default behavior and scroll to the section if it exists.
					if ($section.length > 0) {
						event.preventDefault();

						// Activate link and lock it.
						$this.addClass('active').addClass('active-locked');

						// Scroll to the section smoothly.
						$('html, body').animate({
							scrollTop: $section.offset().top
						}, 500);
					}
				} else {
					// For external or relative links, allow normal navigation.
					window.location.href = href;
				}
			})
			.each(function () {
				var $this = $(this);
				var href = $this.attr('href');

				// Skip non-anchor links.
				if (!href || href.charAt(0) !== '#') return;

				var id = href.substring(1); // Remove '#' to get the ID.
				var $section = $('#' + id);

				if ($section.length > 0) {
					// Scrollex for smooth transitions.
					$section.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function () {
							$section.addClass('inactive'); // Deactivate section initially.
						},
						enter: function () {
							// Activate section.
							$section.removeClass('inactive');

							// If no locked links, activate this section's link.
							if ($sidebar_a.filter('.active-locked').length == 0) {
								$sidebar_a.removeClass('active');
								$this.addClass('active');
							}
							// Unlock if this section's link is locked.
							else if ($this.hasClass('active-locked')) {
								$this.removeClass('active-locked');
							}
						}
					});
				}
			});
	}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);