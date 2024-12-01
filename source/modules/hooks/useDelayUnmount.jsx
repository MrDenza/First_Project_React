// Использование:
/*
JSX: 
---useHook:
	import { useDelayUnmount } from ".....";
	const shouldRenderChild = useDelayUnmount(visible, delay); // true/false и ms
---withDelayUnmount:
	import DelayMount from ".....";
    <DelayMount
        component={Component} // компоненты который рендерим
        visible={isVisible} // показать? true/false
        delay="1000" // длительность ms, не меньше чем у стилей animation
        mountClass="delay-m__type-1" // className анимации монтирования 
        unmountClass="delay-unm__type-1" // className анимации демонтирования
		{...остальные props для Component }
    />

style.css: 
---описать свои анимации
	.delay-m__type-1 {
		animation: inAnimation 600ms ease-in;
	}
	@keyframes inAnimation {
		0% {
			scale: 0;
			opacity: 0;
		}
		100% {
			scale: 1;
			opacity: 1;
		}
	}

	.delay-unm__type-1 {
		animation: outAnimation 1000ms ease-out;
	}
	@keyframes outAnimation {
		0% {
			scale: 1;
			opacity: 1;
		}
		100% {
			scale: 0;
			opacity: 0;
		}
	}
*/
// function DelayMount({ component: Comp, visible = true, delay = 1000, mountClass = null, unmountClass = null, ...props }) {
// 	const shouldRenderChild = useDelayUnmount(visible, delay);

// 	return (
// 		!!shouldRenderChild && (
// 			<div className={shouldRenderChild && !visible ? unmountClass : mountClass}>
// 				<Comp {...props}>
// 					{props.children}
// 				</Comp>
// 			</div>
// 		)
// 	);
// }

// export default memo(DelayMount);


// import React from "react";
import { useEffect, useState } from "react";

export const useDelayUnmount = (isMounted, delayTime = 500) => {
    const [shouldRender, setShouldRender] = useState(isMounted);

    useEffect(() => {
        let timeoutId;

        if (isMounted) {
            setShouldRender(true);
        } else {
            timeoutId = setTimeout(() => setShouldRender(false), delayTime);
        }

        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime]);

    return shouldRender;
}