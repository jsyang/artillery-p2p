function modal(element) {
    const {style} = element;

    style.position        = 'absolute';
    style.left            = '50%';
    style.top             = '50%';
    style.transform       = 'translate(-50%, -50%)';
    style.backgroundColor = '#cccccc';
    style.fontFamily      = 'sans-serif';
    style.zIndex          = 1;
    style.width           = '100%';
    style.maxWidth        = '480px';
    style.boxSizing       = 'border-box';
    style.padding         = '1em';
    style.border          = '1px solid #666666';
}

export default {
    modal
}