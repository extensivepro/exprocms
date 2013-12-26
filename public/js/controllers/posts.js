/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-25
 * Time: 下午1:32
 * To change this template use File | Settings | File Templates.
 */
var opts = {
    container: 'epiceditor',
    textarea: 'epictextarea',
    basePath: 'epiceditor',
    clientSideStorage: true,
    localStorageName: 'epiceditor',
    useNativeFullscreen: true,
    parser: marked,
    file: {
        name: 'epiceditor',
        defaultContent: '',
        autoSave: 100
    },
    theme: {
        base: '/themes/base/epiceditor.css',
        preview: '/themes/preview/github.css',
        editor: '/themes/editor/epic-dark.css'
    },
    button: {
        preview: true,
        fullscreen: true,
        bar: "auto"
    },
    focusOnLoad: false,
    shortcut: {
        modifier: 18,
        fullscreen: 70,
        preview: 80
    },
    string: {
        togglePreview: '切换至预览模式',
        toggleEdit: '切换至编辑模式',
        toggleFullscreen: '进入全屏'
    },
    autogrow: false,
    autogrow: {
        minHeight: 400,
        maxHeight: 400
    }
}


var editor = new EpicEditor(opts).load();





