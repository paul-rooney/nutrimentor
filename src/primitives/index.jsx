import { useEffect, useRef, useState } from "react";
import feather from "./feather-sprite.svg";
import "./index.css";

export const Box = ({ padding = "var(--size-3)", borderWidth = "0", children, ...attributes }) => {
    const i = `box-${[padding, borderWidth].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                padding: ${padding};
                border: ${borderWidth} solid;
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`box ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Center = ({ max = "var(--size-content-3)", andText = false, gutters = "0", intrinsic = false, children, ...attributes }) => {
    const i = `center-${[max, andText, gutters, intrinsic].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                max-inline-size: ${max};
                ${
                    gutters
                        ? `
                padding-inline: ${gutters};`
                        : ""
                }
                ${
                    andText
                        ? `
                text-align: center;`
                        : ""
                }
                ${
                    intrinsic
                        ? `
                display: flex;
                flex-direction: column;
                align-items: center;`
                        : ""
                }
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`center ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Cluster = ({ justify = "flex-start", align = "flex-start", space = "var(--size-3)", children, ...attributes }) => {
    const i = `cluster-${[justify, align, space].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                justify-content: ${justify};
                align-items: ${align};
                gap: ${space};
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`cluster ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Container = ({ name = null, children, ...attributes }) => {
    const i = `container-${[name].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                container-type: inline-size;
                ${name ? `container-name: ${name}` : ""}
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`container ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Cover = ({ centered = "h1", space = "var(--size-3)", minBlockSize = "100vh", noPad = false, children, ...attributes }) => {
    const element = useRef(null);

    useEffect(() => {
        if (!element) return;

        const targets = Array.from(document.querySelectorAll(".cover"));
        targets.forEach((target) => target.setAttribute("data-observe", ""));
        const callback = (entries) => {
            entries.forEach((entry) => {
                entry.target.setAttribute("data-visible", entry.isIntersecting);
            });
        };

        const observer = new IntersectionObserver(callback);
        targets.forEach((target) => observer.observe(target));
    }, [element]);

    const i = `cover-${[centered, space, minBlockSize, noPad].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                min-block-size: ${minBlockSize};
                padding: ${noPad ? "0" : space};
            }
            
            [data-i="${i}"] > * {
                margin-block: ${space};
            }

            [data-i="${i}"] > :first-child:not(${centered}) {
                margin-block-start: 0;
            }
            
            [data-i="${i}"] > :last-child:not(${centered}) {
                margin-block-end: 0;
            }
            
            [data-i="${i}"] > ${centered} {
                margin-block: auto;
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`cover ${attributes.className ?? ""}`.trim()} data-i={i} ref={element}>
            {children}
        </div>
    );
};

export const Frame = ({ ratio = "16:9", children, ...attributes }) => {
    const i = `frame-${[ratio].join("-")}`;

    if (!document.getElementById(i)) {
        let aspectRatio = ratio.split(":");
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                aspect-ratio: ${aspectRatio[0]} / ${aspectRatio[1]};
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`frame ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Grid = ({ space = "var(--size-3)", min = "250px", children, ...attributes }) => {
    const i = `grid-${[space, min].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                gap: ${space};
                grid-template-columns: repeat(auto-fill, minmax(min(${min}, 100%), 1fr));
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`grid ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Icon = ({ space = null, label = null, direction = "rtl", icon, children, ...attributes }) => {
    let i = "";

    if (space) {
        i = `icon-${[space, label, direction].join("-")}`;

        if (!document.getElementById(i)) {
            let style = document.createElement("style");

            style.id = i;
            style.innerHTML = `
                [data-i="${i}"] {
                    display: inline-flex;
                    align-items: baseline;
                }

                [data-i="${i}"] > svg {
                    margin-inline-end: ${space};
                }
            `
                .replace(/\s\s+/g, " ")
                .trim();

            document.head.appendChild(style);
        }
    }

    return (
        <span {...attributes} className={`icon ${attributes.className ?? ""}`.trim()} data-i={i} dir={direction} role="img" aria-label={label}>
            <svg className="icon">
                <use href={`${feather}#${icon}`} />
            </svg>
            {children}
        </span>
    );
};

export const Imposter = ({ breakout = false, margin = "0px", fixed = false, children, ...attributes }) => {
    const i = `imposter-${[breakout, margin, fixed].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                ${
                    breakout
                        ? `
                max-inline-size: calc(100% - (${margin} * 2));
                max-block-size: calc(100% - (${margin} * 2));
                overflow: auto;`
                        : ""
                }
                ${
                    fixed
                        ? `
                position: fixed;`
                        : ""
                }
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`imposter ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Reel = ({ itemWidth = "auto", height = "auto", space = "var(--size-3)", noBar = false, children, ...attributes }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const element = useRef(null);

    useEffect(() => {
        if (!element) return;

        if (element.current.scrollWidth > element.current.clientWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }
    }, [element]);

    const i = `reel-${[itemWidth, height, space, noBar].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                block-size: ${height};
            }
        
            [data-i="${i}"] > * {
                flex: 0 0 ${itemWidth};
            }
        
            [data-i="${i}"] > * + * {
                margin-inline-start: ${space};
            }
        
            [data-i="${i}"].overflowing {
                ${
                    !noBar
                        ? `
                padding-block-end: ${space};`
                        : ""
                }
            }
        
            ${
                noBar
                    ? `
            [data-i="${i}"] {
                scrollbar-width: none;
            }
            
            [data-i="${i}"]::-webkit-scrollbar {
                display: none;
            }`
                    : ""
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`${isOverflowing ? "reel overflowing" : "reel"} ${attributes.className ?? ""}`.trim()} data-i={i} ref={element}>
            {children}
        </div>
    );
};

export const Sidebar = ({ side = "left", sideWidth = null, contentMin = "50%", space = "var(--size-3)", noStretch = false, children, ...attributes }) => {
    const i = `sidebar-${[side, sideWidth, contentMin, space, noStretch].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                gap: ${space};
                ${
                    noStretch
                        ? `
                align-items: flex-start;`
                        : ""
                }
            }

            [data-i="${i}"] > * {
                ${
                    sideWidth
                        ? `
                flex-basis: ${sideWidth};`
                        : ""
                }
            }

            [data-i="${i}"] > ${side !== "left" ? `:first-child` : `:last-child`} {
                flex-basis: 0;
                flex-grow: 999;
                min-inline-size: ${contentMin};
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`sidebar ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Stack = ({ space = "var(--size-3)", recursive = false, splitAfter = null, children, ...attributes }) => {
    const i = `stack-${[space, recursive, splitAfter].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] ${recursive ? "" : "> "} * + * {
                margin-block-start: ${space};
            }

            ${
                splitAfter
                    ? `
            [data-i="${i}"]:only-child {
                block-size: 100%;
            }

            [data-i="${i}"] > :nth-child(${splitAfter}) {
                margin-block-end: auto;
            }`
                    : ""
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`stack ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};

export const Switcher = ({ threshold = "var(--size-content-3)", space = "var(--size-3)", limit = 4, children, ...attributes }) => {
    const i = `switcher-${[threshold, space, limit].join("-")}`;

    if (!document.getElementById(i)) {
        let style = document.createElement("style");

        style.id = i;
        style.innerHTML = `
            [data-i="${i}"] {
                gap: ${space};
            }

            [data-i="${i}"] > * {
                flex-basis: calc((${threshold} - 100%) * 999);
            }

            [data-i="${i}"] > :nth-last-child(n + ${parseInt(limit) + 1}),
            [data-i="${i}"] > :nth-last-child(n + ${parseInt(limit) + 1}) ~ * {
                flex-basis: 100%;
            }
        `
            .replace(/\s\s+/g, " ")
            .trim();

        document.head.appendChild(style);
    }

    return (
        <div {...attributes} className={`switcher ${attributes.className ?? ""}`.trim()} data-i={i}>
            {children}
        </div>
    );
};
