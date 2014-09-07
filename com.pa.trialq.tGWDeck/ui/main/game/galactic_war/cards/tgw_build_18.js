define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return "Build Tech, increases the fabrication rate of all fabricators by 18%";
        },
        summarize: function(params) {
            return 'Build +18%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_build_18.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 41;
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/vehicle_factory/vehicle_factory_build_arm.json',
                '/pa/units/land/fabrication_vehicle/fabrication_vehicle_build_arm.json',
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv_build_arm.json',
                '/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv_build_arm.json',
                '/pa/units/land/bot_factory/bot_factory_build_arm.json',
                '/pa/units/land/fabrication_bot/fabrication_bot_build_arm.json',
                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat_build_arm.json',
                '/pa/units/land/bot_factory_adv/bot_factory_adv_build_arm.json',
                '/pa/units/land/fabrication_bot_adv/fabrication_bot_adv_build_arm.json',
                '/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv_build_arm.json',
                '/pa/units/air/air_factory/air_factory_build_arm.json',
                '/pa/units/air/fabrication_aircraft/fabrication_aircraft_build_arm.json',
                '/pa/units/air/air_factory_adv/air_factory_adv_build_arm.json',
                '/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv_build_arm.json',
                '/pa/units/sea/naval_factory/naval_factory_build_arm.json',
                '/pa/units/sea/fabrication_ship/fabrication_ship_build_arm.json',
                '/pa/units/sea/naval_factory_adv/naval_factory_adv_build_arm.json',
                '/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv_build_arm.json',
                '/pa/units/orbital/orbital_launcher/orbital_launcher_build_arm.json',
                '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot_build_arm.json',
                '/pa/units/orbital/orbital_factory/orbital_factory_build_arm.json',
                '/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_build_arm.json',
                '/pa/tools/commander_build_arm/commander_build_arm.json'
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'construction_demand.metal',
                    op: 'multiply',
                    value: 1.18
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
