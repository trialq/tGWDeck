define([
], function(
) {
    var deck = [
    //tgw deck has 51: 16 original cards, 25 buff cards, and 10 mystery cards
        
        //unmodified cards
        'gwc_add_card_slot',
        'gwc_enable_air_t1',
        'gwc_enable_bots_t1',
        'gwc_enable_orbital_t1',
        'gwc_enable_sea_t1',
        'gwc_enable_vehicles_t1',
        'gwc_enable_air_all',
        'gwc_enable_bots_all',
        'gwc_enable_vehicles_all',
        'gwc_enable_orbital_all',
        'gwc_enable_sea_all',
        'gwc_minion',
        'gwc_storage_1',
        'gwc_enable_artillery',
        'gwc_enable_defenses_t2',
        'gwc_enable_super_weapons',

        //buff cards
        'tgw_build_7',
        'tgw_metal_7',
        'tgw_energy_7',
        'tgw_speed_7',
        'tgw_health_7',
        'tgw_damage_7',
        'tgw_build_12',
        'tgw_metal_12',
        'tgw_energy_12',
        'tgw_speed_12',
        'tgw_health_12',
        'tgw_damage_12',
        'tgw_build_18',
        'tgw_metal_18',
        'tgw_energy_18',
        'tgw_speed_18',
        'tgw_health_18',
        'tgw_damage_18',
        'tgw_build_25',
        'tgw_metal_25',
        'tgw_energy_25',
        'tgw_speed_25',
        'tgw_health_25',
        'tgw_damage_25',
    
        //mystery cards
        'tgw_up_to_11_air_fab',
        'tgw_up_to_11_anchor',
        'tgw_up_to_11_boom',
        'tgw_up_to_11_combat_adv',
        'tgw_up_to_11_comm',
        'tgw_up_to_11_gunship',
        'tgw_up_to_11_inferno',
        'tgw_up_to_11_mine',
        'tgw_up_to_11_scout',
        'tgw_up_to_11_t2'
        
        
        
        
    ];

    var aiDeck = [
        //unmodified cards
        'gwc_add_card_slot',
        'gwc_enable_air_all',
        'gwc_enable_bots_all',
        'gwc_enable_vehicles_all',
        'gwc_enable_orbital_all',
        'gwc_enable_sea_all',
        'gwc_minion',
        'gwc_storage_1',
        'gwc_enable_artillery',
        'gwc_enable_defenses_t2',
        'gwc_enable_super_weapons',

        //buff cards
        'tgw_build_12',
        'tgw_metal_12',
        'tgw_energy_12',
        'tgw_speed_12',
        'tgw_health_12',
        'tgw_damage_12',
        'tgw_build_18',
        'tgw_metal_18',
        'tgw_energy_18',
        'tgw_speed_18',
        'tgw_health_18',
        'tgw_damage_18',
        'tgw_build_25',
        'tgw_metal_25',
        'tgw_energy_25',
        'tgw_speed_25',
        'tgw_health_25',
        'tgw_damage_25',
    
        //mystery cards
        'tgw_up_to_11_air_fab',
        'tgw_up_to_11_anchor',
        'tgw_up_to_11_boom',
        'tgw_up_to_11_combat_adv',
        'tgw_up_to_11_comm',
        'tgw_up_to_11_gunship',
        'tgw_up_to_11_inferno',
        'tgw_up_to_11_mine',
        'tgw_up_to_11_scout',
        'tgw_up_to_11_t2'
    ];
    
    var extraDeck = [
        'gwc_start_vehicle',
        'gwc_start_air',
        'gwc_start_bot',
        'gwc_start_orbital',
        'gwc_start_artillery',
        'gwc_start_subcdr',
        'gwc_start_combatcdr',
        'gwc_start_allfactory',
    ];

    var cards = [];
    var aiCards = [];
    var extraCards = {};
    var cardContexts = {};

    var loadCount = deck.length + aiDeck.length + extraDeck.length;
    var loaded = $.Deferred();
    
    var saveDeck = deck;
    deck = [];
    _.forEach(saveDeck, function (cardId) {
        //console.log('ADDING CARD: '+cardId);
        require(['cards/' + cardId], function (card) {
            card.id = cardId;
            cards.push(card);
            deck.push(cardId);
            if (--loadCount === 0)
                loaded.resolve();
        });
    })
    
    var saveAIDeck = aiDeck;
    aiDeck = [];
    _.forEach(saveAIDeck, function(cardId) {
        require(['cards/' + cardId], function(card) {
            card.id = cardId;
            aiCards.push(card);
            aiDeck.push(cardId);
            if (--loadCount === 0)
                loaded.resolve();
        });
    })
    
    _.forEach(extraDeck, function(cardId) {
        require(['cards/' + cardId], function(card) {
            card.id = cardId;
            extraCards[cardId] = card;
            if (--loadCount === 0)
                loaded.resolve();
        });
    })

    var allCards = [];
    var allDeck = [];
    loaded.then(function() {
        allCards = cards.concat(aiCards).concat(_.values(extraCards));
        allDeck = deck.concat(aiDeck).concat(extraDeck);
    });
    
    return {
        deal: function (params) {
            var galaxy = params.galaxy;
            var inventory = params.inventory;
            var ready = params.ready;
            var rng = params.rng || new Math.seedrandom();
            
            var result = $.Deferred();
            
            var run = function() {
                //console.log("DEALER");
                var remainingAICards = aiCards.slice(0);
                var remainingAIDeck = aiDeck.slice(0);
                
                _.forEach(allCards, function(card) {
                    if (card.getContext && !cardContexts[card.id]) {
                        cardContexts[card.id] = card.getContext(galaxy, inventory);
                    }
                });
                
                _.forEach(galaxy.stars(), function(system) {
                    var systemCards = [];
                    var systemDeck = [];
                    var fullHand = [];
                    var hand = [];
                    var resultIndex = undefined;
                    
                    if (system.card()) {
                        var preCard = system.card();
                        if (!_.isString(preCard)) 
                            return; // If the system already has a card, consider it dealt
                        var extra = extraCards[preCard];
                        if (extra && extra.getContext && !cardContexts[preCard])
                            cardContexts[preCard] = extra.getContext(galaxy, inventory);
                        var context = cardContexts[preCard];
                        var deal = extra && extra.deal(system, context);
                        if (deal && _.isObject(deal)) {
                            systemCards = [extra];
                            systemDeck = [preCard];

                            fullHand = [deal];
                            hand = fullHand;
                            resultIndex = 0;
                        }
                    }
                    
                    if (!hand.length)
                    {
                        var aiSystem = (system.ai() && !!remainingAICards.length);
                        var bossSystem = aiSystem && system.ai().boss;
                        systemCards = bossSystem ? remainingAICards : cards;
                        systemDeck = bossSystem ? remainingAIDeck : deck;

                        fullHand = _.map(systemCards, function(card, cardIndex) {
                            var context = cardContexts[card.id];
                            return card.deal && card.deal(system, context);
                        });
                        hand = _.map(fullHand, function(deal, index) { 
                            if (!_.isObject(deal))
                                return;
                            deal.index = index;
                            return deal;
                        });
                        hand = _.filter(hand, 'chance');
                    }
                    
                    if (hand.length) {
                        if (resultIndex === undefined) {
                            var probability = _.reduce(hand, function(sum, card) {
                                return sum + card.chance;
                            }, 0);
                            var roll = rng() * probability;
                            var index = 0;
                            for(; roll >= hand[index].chance && index < hand.length; ++index) {
                                roll -= hand[index].chance;
                            }
                            if (index < hand.length) {
                                var result = hand[index];
                                resultIndex = result.index;
                            }
                        }
                        if (resultIndex !== undefined) {
                            var resultDeal = fullHand[resultIndex];
                            var params = resultDeal && resultDeal.params;
                            var cardId = systemDeck[resultIndex];
                            var systemCard = { id: cardId };
                            if (params && _.isObject(params))
                                _.extend(systemCard, params);
                            system.card(systemCard);
                        }
                    }
                    _.forEach(fullHand, function(params, index) {
                        var card = systemCards[index];
                        var cardId = systemDeck[index];
                        var context = cardContexts[cardId];
                        if (index === resultIndex) {
                            //console.log("Keep: " + cardId);
                            card.keep && card.keep(params, context);
                        }
                        else {
                            card.discard && card.discard(params, context);
                        }
                    });
                    
                    // Remove AI cards from the deck
                    if (system.ai()) {
                        remainingAICards.splice(index, 1);
                        remainingAIDeck.splice(index, 1);
                    }
                });
                
                _.forEach(allCards, function(card, index) {
                    var cardId = allDeck[index];
                    var context = cardContexts[cardId];
                    card.releaseContext && card.releaseContext(context);
                    if (context)
                        delete cardContexts[cardId];
                });

                if (ready)
                    ready();
                result.resolve();
            };
            
            loaded.then(run);
            return result.promise();
        },
        
        // Do everything necessary to deal a single card
        // params: (example)
        //      {
        //          id: 'gwc_minion',
        //          galaxy: game.galaxy(),
        //          inventory: game.inventory(),
        //          star: game.galaxy().stars()[0]
        //      }
        dealCard: function(params) { 
            var result = $.Deferred();
            loaded.then(function() {
                var allCards = cards.concat(aiCards).concat(_.values(extraCards));
                var card = _.find(allCards, {id: params.id});

                // Simulate a deal
                var context = card.getContext && card.getContext(params.galaxy, params.inventory);
                var deal = (card.deal && card.deal(params.star, context));
                var product = { id: params.id };
                var cardParams = deal && deal.params;
                if (cardParams && _.isObject(cardParams))
                    _.extend(product, cardParams);
                card.keep && card.keep(deal, context);
                card.releaseContext && card.releaseContext(context);
                result.resolve(product, deal);
            });
            return result;
        },
        
        allCards: function() {
            var result = $.Deferred();
            loaded.then(function() {
                var allCards = cards.concat(aiCards).concat(_.values(extraCards));
                result.resolve(allCards);
            });
            return result;
        }
    };
});
