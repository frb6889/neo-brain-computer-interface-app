import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { updateAppLanguage } from "./helpers/language_helpers";
import { Crosshair1Icon, GearIcon, TargetIcon, GlobeIcon, MinusIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        syncThemeWithLocal();
        updateAppLanguage(i18n);

        // 预加载
        buttons.forEach(button => {
            const img = new Image();
            img.src = button.image;
        });
    }, []);

    // 定义一个状态来保存当前hover的按钮索引
    const [hoveredButton, setHoveredButton] = useState(null);


    const buttons = [
        { deg: 0, name: "训练", icon: <Crosshair1Icon className="w-[50px] h-[50px]" />, image: "../images/choosed2.png" },
        { deg: 60, name: "切换语言", icon: <GlobeIcon className="w-[50px] h-[50px]" />, image: "../images/choosed3.png" },
        { deg: 120, name: "关闭", icon: <Cross2Icon className="w-[50px] h-[50px]" />, image: "../images/choosed4.png" },
        { deg: 180, name: "设置", icon: <GearIcon className="w-[50px] h-[50px]" />, image: "../images/choosed5.png" },
        { deg: 240, name: "最小化", icon: <MinusIcon className="w-[50px] h-[50px]" />, image: "../images/choosed6.png" },
        { deg: 300, name: "校准", icon: <TargetIcon className="w-[50px] h-[50px]" />, image: "../images/choosed1.png" },
    ];


    //保存光标位置
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clickPosition, setClickPosition ] = useState({x: 0,y:0});

    //监听光标移动
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    //监听光标左键点击
    useEffect(() => {
        const handleClick = (event : MouseEvent) => {
            setClickPosition({
                x: event.clientX,
                y:event.clientY,
            });
        };
        window.addEventListener('click',handleClick);
        
        return()=> {
            window.removeEventListener('click',handleClick);
        }
    })

    return (
        <div className="bg-transparent">
            <div className="bg-slate-200 text-slate-900 p-2 z-20" style={{ position:'absolute' }}>
                <h1>鼠标位置</h1>
                <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
                <h1>鼠标左键位置</h1>
                <p>Click X: {clickPosition.x}, Click Y: {clickPosition.y}</p>
            </div>
            <div className="relative w-[700px] h-[700px] rounded-full flex justify-center items-center">
                {/* 大圆 */}
                <img src="../images/bigcircle.png" className="relative w-[690px] h-[690px] rounded-full flex justify-center items-center border-b border-border/40 shadow-xl z-1" />

                {/* 大圆hover效果 */}
                {buttons.map((btn, index) => (
                    <img
                        src={btn.image}
                        className="absolute w-[690px] h-[690px] flex justify-center items-center z-12"
                        style={{
                            opacity: hoveredButton === index ? 0.4 : 0, // 控制透明度
                            transition: 'opacity 0.2s ease-in-out',  // 透明度渐变
                        }}
                    />
                ))}

                {/* 镂空的小圆 */}
                <div className="absolute w-[180px] h-[180px] bg-zinc-800/80 rounded-full shadow-inner"></div>

                {/* 中心的黑色球 */}
                <img
                    src="../images/lightdot.png"
                    className="absolute w-[100px] h-[100px] justify-center items-center rounded-full z-11 shadow-lg"
                    alt="draggable-dot"
                    style={{ WebkitAppRegion: 'drag' }}
                />

                {/* 按钮 */}
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        variant="link"
                        className="absolute flex flex-col justify-center items-center w-[250px] h-[250px] text-black/75 rounded-full"
                        style={{
                            transform: `rotate(${btn.deg}deg) translate(230px) rotate(-${btn.deg}deg)`, // 按钮的旋转和位移
                            transformOrigin: 'center'  // 使按钮围绕圆心旋转
                        }}
                        // 当鼠标进入时设置hover状态
                        onMouseEnter={() => setHoveredButton(index)}
                        // 当鼠标离开时重置hover状态
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        {btn.icon} {/* 上方图标 */}
                        <span className="text-md mt-2">{btn.name}</span> {/* 下方文字 */}
                    </button>
                ))}

                {/* 分割线 */}
                {buttons.map((btn, index) => (
                    <div
                        key={index}
                        className="absolute w-[1px] h-[150px] bg-gray-200"
                        style={{
                            transform: `rotate(${btn.deg}deg) translate(0px) translateY(230px)`, // 旋转
                            transformOrigin: 'center', // 以圆心为基准旋转
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
