(() => {
	'use strict';

	const style = (element, declarations) => {
		for (const declaration in declarations) {
			element.style[declaration] = declarations[declaration];
		}
	}

	// ----------------------------------------------------------------
	// first

	const badge = document.querySelector('.badge');
	const stripe = badge.querySelector('.badge__stripe');
	const shadowBottom = badge.querySelector('.badge__shadow--bottom');
	const shadowTop = badge.querySelector('.badge__shadow--top');

	const stripeHeight = stripe.clientHeight;
	const stripeWidth = stripe.offsetWidth;
	const stripeTotalWidth = stripe.getBoundingClientRect().width;

	style(shadowBottom, {
		width: stripeWidth + 'px',
		height: stripeHeight / 3 + 'px',
		top: 'calc(50% + ' + stripeHeight / 2 + 'px)'
	})
	style(shadowTop, {
		height: stripeHeight + 'px',
		width: stripeHeight / 3 + 'px',
		top: 'calc(50% + ' + stripeHeight / -2 + 'px)',
		left: 'calc(50% + ' + stripeWidth / 2 + 'px)'
	})

	// ----------------------------------------------------------------
	// second

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

	style(shadow, {
		width: `${hypothenuse}px`,
		top: `50%`,
		transform: `rotate(-${angle}deg)
					 translateX(-50%)`
	})

	// ----------------------------------------------------------------
	// third

	const badgeSvg = document.querySelector('.badge-svg');
	const stripeSvg = badgeSvg.querySelector('.badge-svg__stripe');
	const shadowSvg = badgeSvg.querySelector('.badge-svg__shadow');
	const polygon = shadowSvg.firstElementChild;

	const stripeSvgHeight = stripeSvg.clientHeight;
	const stripeSvgHalfHeight = stripeSvgHeight / 2;
	const stripeSvgWidth = stripeSvg.offsetWidth;

	style(shadowSvg, {
		width: `${stripeSvgWidth * 1.25}px`,
		top: `calc(50% - ${stripeSvgHalfHeight}px)`,
		left: `calc(50% - ${stripeSvgWidth / 2}px)`
	})

	shadowSvg.setAttribute('viewBox', `0 0 ${stripeSvgWidth * 1.25} ${stripeSvgHeight * 1.5}`)

	polygon.setAttribute(
		'points',
		`0,${stripeSvgHeight} `
		+ `${stripeSvgWidth / 4},${stripeSvgHeight * 1.25} `
		+ `${stripeSvgWidth * 1.25},${stripeSvgHeight * 1.25} `
		+ `${stripeSvgWidth * 1.25},${stripeSvgHeight * 0.25} `
		+ `${stripeSvgWidth},0 `
		+ `0,${stripeSvgHeight}`
	);
})()
