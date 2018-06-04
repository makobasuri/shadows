(() => {
	'use strict';

	const style = (element, declarations) => {
		for (declaration in declarations) {
			element.style[declaration] = declaration
		}
	}

	const badge = document.querySelector('.badge');
	const stripe = badge.querySelector('.badge__stripe');
	const shadowBottom = badge.querySelector('.badge__shadow--bottom');
	const shadowTop = badge.querySelector('.badge__shadow--top');

	const stripeHeight = stripe.clientHeight;
	const stripeWidth = stripe.offsetWidth;
	const stripeTotalWidth = stripe.getBoundingClientRect().width;

	shadowBottom.style.width = stripeWidth + 'px';
	shadowBottom.style.height = stripeHeight / 3 + 'px';
	shadowBottom.style.top = 'calc(50% + ' + (stripeHeight / 2) + 'px)';
	shadowTop.style.height = stripeHeight + 'px';
	shadowTop.style.width = stripeHeight / 3 + 'px';
	shadowTop.style.top = 'calc(50% + ' + (stripeHeight / -2) + 'px)';
	shadowTop.style.left = 'calc(50% + ' + (stripeWidth / 2) + 'px)';

	const badge1 = document.querySelector('.badge1');
	const stripe1 = badge1.querySelector('.badge1__stripe');
	const shadow = badge1.querySelector('.badge1__shadow');

	const stripeHeight1 = stripe1.clientHeight;
	const halfHeight = stripeHeight1 / 2;
	const stripeWidth1 = stripe1.offsetWidth;
	const stripeTotalWidth1 = stripe1.getBoundingClientRect().width;
	const hypothenuse
		= Math.sqrt(
			Math.pow(stripeHeight1, 2)
			+ Math.pow(stripeWidth1, 2)
		)
	;

	const angle
		= Math.asin(stripeHeight1 / hypothenuse)
		* (180 / Math.PI)
	;

	shadow.style.width = `${hypothenuse}px`;
	shadow.style.top = `50%`;
	shadow.style.transform
		= `rotate(-${angle}deg)
			translateX(-50%)`
	;

	const badgeSvg = document.querySelector('.badge-svg');
	const stripeSvg = badgeSvg.querySelector('.badge-svg__stripe');
	const shadowSvg = badgeSvg.querySelector('.badge-svg__shadow');
	const polygon = shadowSvg.firstElementChild;

	const stripeSvgHeight = stripeSvg.clientHeight;
	const stripeSvgHalfHeight = stripeSvgHeight / 2;
	const stripeSvgWidth = stripeSvg.offsetWidth;

	style(shadowSvg, {
		width = `${stripeSvgWidth * 1.25}px`,
		top = `calc(50% - ${stripeSvgHalfHeight}px)`,
		left = `calc(50% - ${stripeSvgWidth / 2}px)`
	})
//	shadowSvg.style.width = `${stripeSvgWidth * 1.25}px`;
//	shadowSvg.style.top = `calc(50% - ${stripeSvgHalfHeight}px)`;
//	shadowSvg.style.left = `calc(50% - ${stripeSvgWidth / 2}px)`;
//	shadowSvg.setAttribute('viewBox', `0 0 ${stripeSvgWidth * 1.25} ${stripeSvgHeight * 1.25}`);
	polygon.setAttribute(
		'points',
		`0 ${stripeSvgHeight} `
		+ `${stripeSvgWidth / 2} ${stripeSvgHeight * 1.25} `
		+ `${stripeSvgWidth * 1.25} ${stripeSvgHeight * 1.25} `
		+ `0 ${stripeSvgHeight}`
	);
})()
