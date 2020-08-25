export default function outsideClick(ref, outsideClickHandle) {

    function outsideClickHandleLocal(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            outsideClickHandle();
        }
    }

    document.addEventListener("mousedown", outsideClickHandleLocal);
}