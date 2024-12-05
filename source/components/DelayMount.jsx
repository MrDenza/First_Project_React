// import React from "react";
import { memo } from "react";
import { useDelayUnmount } from "../modules/hooks/useDelayUnmount";

function DelayMount({ component: Comp, visible = true, delay = 1000, mountClass = "", unmountClass = "", className = "", ...props }) {
    const shouldRenderChild = useDelayUnmount(visible, delay);

    return (
        !!shouldRenderChild && (
            <div className={`${shouldRenderChild && !visible ? unmountClass : mountClass} ${className}`}>
                <Comp {...props}>{props.children}</Comp>
            </div>
        )
    );
}

export default memo(DelayMount);
