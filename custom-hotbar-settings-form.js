import { CustomHotbarSettings } from './custom-hotbar-settings.js';

export class CustomHotbarSettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "custom-hotbar-settings-form",
            title: "(𝗚𝗠 𝗢𝗻𝗹𝘆) Set Default Global Custom Hotbar",
            template: "./modules/custom-hotbar/templates/customHotbarSettings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = {        
            chbPrimaryColor: game.settings.get("custom-hotbar", "chbPrimaryColor"), 
            chbBorderColor: game.settings.get("custom-hotbar", "chbBorderColor"),
            chbBorderColorActive: game.settings.get("custom-hotbar", "chbBorderColorActive"),
            chbBorderColorInactive: game.settings.get("custom-hotbar", "chbBorderColorInactive"),

            chbXPos: game.settings.get("custom-hotbar", "chbXPos"),
            chbYPos: game.settings.get("custom-hotbar", "chbYPos")
        };
        if (this.reset == true) {
            data = {    
                chbPrimaryColor: game.settings.settings.get("custom-hotbar.chbPrimaryColor").default,
                chbBorderColor: game.settings.settings.get("custom-hotbar.chbBorderColor").default,
                chbBorderColorActive: game.settings.settings.get("custom-hotbar.chbBorderColorActive").default,
                chbBorderColorInactive: game.settings.settings.get("custom-hotbar.chbBorderColorInactive").default,

                chbXPos: game.settings.settings.get("custom-hotbar.chbXPos").default,
                chbYPos: game.settings.settings.get("custom-hotbar.chbYPos").default
            };
        }
        this.render;
        return data;
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     *
     *  'name': entry.metadata.label+' ['+entry.metadata.package+']',
     *  'type':'pack',
     *  'submenu':submenu.toLowerCase(),
     *  'key':entry.metadata.package+'.'+entry.metadata.name
     */
    //this is currently defined for an onload not a submit...
    async _updateObject(e, d) {
        console.debug("Custom Hotbar | Attempting to update settings with form values...");
        game.settings.set("custom-hotbar", "chbPrimaryColor", d.chbPrimaryColor);
        game.settings.set("custom-hotbar", "chbBorderColor", d.chbBorderColor);
        game.settings.set("custom-hotbar", "chbBorderColorActive", d.chbBorderColorActive);
        game.settings.set("custom-hotbar", "chbBorderColorInactive", d.chbBorderColorInactive);
        game.settings.set("custom-hotbar","chbXPos", d.chbXPos);
        game.settings.set("custom-hotbar","chbYPos", d.chbYPos);
        this.render();
        ui.notifications.notify("Saving... Please refresh Foundry to apply changes.");                                                     
    }
    
    


    onReset() {
        console.debug("Custom Hotbar | Attempting to reset chbSettingsForm to defaults");
        this.reset = true;
        this.render();
    }

    activateListeners(html) {
        console.debug("Custom Hotbar | Attempting to activate CHB Settings Form listeners");
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
        //add on(input) thingie here
    }
}