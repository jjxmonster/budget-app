import gsap from 'gsap'


export const ImageAnimations = ()=>
{
    const timeLine = gsap.timeline({ defaults: { ease: 'bounce.out' } })
    timeLine.from("#Coin",{y:-150,duration:0.8})
    timeLine.from("#chart",{x:100,opacity:0,duration:1,ease: "power2.out"},"start")
    timeLine.from("#chart2",{x:100,opacity:0,delay:0.5,duration:1,ease: "power2.out"},"start")
    timeLine.to("#Coin",{y: -50, repeat: -1, yoyo: true,duration:1,ease: "none"})
}