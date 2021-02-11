/*
    The following code manages the price tool logic. 
    
    The defininng category and service data region will change the price, name, description, or header of each service. 

    The category button functionalityregion is in charge of displaying the correct service info depending on the selected category

    The price functionality region is incharge of updating the price container and the service quantity's
*/
//#region Defining category, service data, and XOpt function constructer
    function Service(initial){
        if(initial){
            this.name = initial.name;
            this.descriptionHeader = initial.descriptionHeader;
            this.description = initial.description;
            this.quantity = initial.quantity;
            this.price = initial.price;
            this.onPress = initial.onPress;
        }
        this.getName = () => {
            return this.name;
        }
        this.setName = (name) => {
            this.name = name;
        }
        this.getDescriptionHeader = () => {
            return this.descriptionHeader;
        }
        this.setDescriptionHeader = (descriptionHeader) => {
            this.descriptionHeader = descriptionHeader;
        }
        this.getDescription = () => {
            return this.description;
        }
        this.setDescription = (description) => {
            this.description = description;
        }
        this.getQuantity = () => {
            return this.quantity;
        }
        this.setQuantity = (quantity) => {
            this.quantity = quantity
        }
        this.getPrice = () => {
            return this.price;
        }
        this.setPrice = (price) => {
            this.price = price;
        }
        //Consider removing onPress Functions
        this.runOnPress = () => {
            this.onPress();
        }
        this.setOnPress = (onPress) => {
            this.onPress = onPress;
        }
    }
    function Option(initial){
        if(initial){
            this.selected = initial.selected;
            this.name = initial.name;
            this.description = initial.description;
            this.priceType = initial.priceType;
            this.price = initial.price;
        }
        this.select = () => {
            this.selected = true;
        }
        this.deSelect = () => {
            this.selected = false;
        }
        this.isSelected = () => {
            return this.selected;
        }
        this.getName = () => {
            return this.name;
        }
        this.setName = (name) => {
            this.name = name;
        }
        this.getDescription = () => {
            return this.description;
        }
        this.setDescription = (description) => {
            this.description = description;
        }
        this.getPriceType = () => {
            return this.priceType;
        }
        this.setPriceType = (type) => {
            this.priceType = type;
        }
        this.getPrice = () => {
            return this.price;
        }
        this.setPrice = (price) => {
            this.price = price;
        }
    }
    function Category(initial){
        if(initial){
            this.name = initial.name;
            this.xOpts = initial.XOpts
            this.options = initial.options;
            this.services = initial.services;
        }
        this.getName = () => {
            return this.name;
        }
        this.setName = (name) => {
            this.name = name;
        }
        this.getAllServices = () => {
            return this.services;
        }
        this.setAllServices = (allServices) => {
            this.services = allServices;
        }
        this.getService = (i) => {
            return this.services[i];
        }
        this.setService = (service, i) => {
            this.services[i] = service;
        }
        this.getXOpts = () => {
            return this.xOpts;
        }
        this.setXOpts = (xOpts) => {
            this.XOpts = xOpts;
        }
        this.getXOpt = (i) => {
            return this.xOpts[i];
        }
        this.setXOpt = (i, xOpt) => {
            this.xOpts[i] = xOpt;
        }
        this.getAllOptions = () => {
            return this.options;
        }
        this.setAllOptions = (options) => {
            this.options = options;
        }
        this.getOption = (i) => {
            return this.options[i];
        }
        this.setOption = (option, i) => {
            this.options[i] = option;
        }
        this.getSelectedOption = () => {
            let selectedOption;

            for(let i = 0; i < this.options.length; i++){
                let focusOption = this.options[i];
                if(focusOption.isSelected()){
                    selectedOption = focusOption;
                }
            }

            return selectedOption;
        }
    }
    function XOpt(settings){
        this.name = settings.name || 'unset';
        this.type = settings.type || 'number';
        this.current = settings.current || null;
        this.options = settings.options || null;
        this.operation = settings.operation || {
            'type': 'add',
            'bi': 0,
            'biOp': 'add'
        };
        this.min = settings.min || '0';
        this.max = settings.max || '1';

        this.getName = () => {
            return this.name;
        }
        this.setName = (name) => {
            this.name = name;
        }
        this.getType = () => {
            return this.type;
        }
        this.setType = (type) => {
            this.type = type;
        }
        this.getCurrent = () => {
            return this.current;
        }
        this.setCurrent = (current) => {
            this.current = current;
        }
        this.getOptions = () => {
            return this.options;
        }
        this.setOptions = (options) => {
            this.options = options;
        }
        this.getOption = (i) => {
            return this.options[i];
        }
        this.setOption = (i, option) => {
            this.option[i] = option;
        }
        this.getOperation = () => {
            return this.operation;
        }
        this.setOperation = (operation) => {
            this.operation = operation;
        }
        this.getMin = () => {
            return this.min;
        }
        this.setMin = (min) => {
            this.min = min;
        }
        this.getMax = () => {
            return this.max;
        }
        this.setMax = (max) => {
            this.max = (max);
        }
    }
//#endregion
//#region Defining category, service data, and XOpt
    var allCategorys = [];
    var crépiEnduitSurNeufCategory = new Category({
        name: 'Crépi/Enduit sur Neuf',
        XOpts: [
            new XOpt({
                name: 'Revêtement actuel',
                type: 'selection',
                current: 'Projeté',
                options: [
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Type d\'isolation souhaitée',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Surface de façade ou murs (m²)',
                type: 'number',
                current: 0,
                operation: {
                    type: 'add',
                    bi: 10,
                    biOp: 'add',
                    fixedAmount: 0
                },
                max: 20
            }),
            new XOpt({
                name: 'Délia souhaité - débuit des travaux',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            })
        ],
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 01',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall item 02',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 03',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 04',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 05',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 06',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 07',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            }),
            new Service({
                name: 'Wall / Ceiling Covering item placeholder 08',
                descriptionHeader: 'Ceiling Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 60
            })
        ],
    })
    var carpentryCategory = new Category({
        name: 'ravalement de façade',
        XOpts: [
            new XOpt({
                name: 'Revêtement actuel',
                type: 'selection',
                current: 'Projeté',
                options: [
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Type d\'isolation souhaitée',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Surface de façade ou murs (m²)',
                type: 'number',
                current: 0,
                operation: {
                    type: 'add',
                    bi: 10,
                    biOp: 'add',
                    fixedAmount: 0
                },
                max: 20
            }),
            new XOpt({
                name: 'Délia souhaité - débuit des travaux',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            })
        ],
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Carpentry item placeholder 01',
                descriptionHeader: 'Carpentry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 250
            }),
            new Service({
                name: 'Carpentry item placeholder 02',
                descriptionHeader: 'Carpentry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 250
            }),
            new Service({
                name: 'Carpentry item placeholder 03',
                descriptionHeader: 'Carpentry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 200
            }),
            new Service({
                name: 'Carpentry item placeholder 04',
                descriptionHeader: 'Carpentry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 650
            })
        ]
    });
    var plasterboardInsulationCategory = new Category({
        name: 'Isolation thermique',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            })
        ],
        XOpts: [
            new XOpt({
                name: 'Revêtement actuel',
                type: 'selection',
                current: 'Projeté',
                options: [
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Type d\'isolation souhaitée',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            }),
            new XOpt({
                name: 'Surface de façade ou murs (m²)',
                type: 'number',
                current: 0,
                operation: {
                    type: 'add',
                    bi: 10,
                    biOp: 'add',
                    fixedAmount: 0
                },
                max: 20
            }),
            new XOpt({
                name: 'Délia souhaité - débuit des travaux',
                type: 'selection',
                current: 'ITE sous enduit',
                options: [
                    {
                        name: 'ITE sous enduit',
                        operation: 'add',
                        amount: 600
                    },
                    {
                        name: 'Projeté',
                        operation: 'add',
                        amount: 500
                    },
                    {
                        name: 'Pas de date fixé!',
                        operation: 'add',
                        amount: 400
                    }
                ]
            })
        ],
        services: [
            new Service({
                name: 'Plasterboard insulation item placeholder 01',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 140
            }),
            new Service({
                name: 'Plasterboard insulation item placeholder 02',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 50
            }),
            new Service({
                name: 'Plasterboard insulation item placeholder 03',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 600
            }),
            new Service({
                name: 'Plasterboard insulation item placeholder 04',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 320
            }),
            new Service({
                name: 'Plasterboard insulation item placeholder 05',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 200
            }),
            new Service({
                name: 'Plasterboard insulation item placeholder 06',
                descriptionHeader: 'Plasterboard Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 150
            })
        ]
    });
    var flooringCategory = new Category({
        name: 'Flooring',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Flooring item placeholder 01',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 150
            }),
            new Service({
                name: 'Flooring item placeholder 02',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 50
            }),
            new Service({
                name: 'Flooring item placeholder 03',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 300
            }),
            new Service({
                name: 'Flooring item placeholder 04',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 120
            }),
            new Service({
                name: 'Flooring item placeholder 05',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 500
            }),
            new Service({
                name: 'Flooring item placeholder 06',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 100
            }),
            new Service({
                name: 'Flooring item placeholder 07',
                descriptionHeader: 'Flooring Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 250
            })
        ]
    });
    var plumbingCategory = new Category({
        name: 'Plumbing',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Plumbing item placeholder 01',
                descriptionHeader: 'Plumbing Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 150
            }),
            new Service({
                name: 'Plumbing item placeholder 02',
                descriptionHeader: 'Plumbing Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 200
            }),
            new Service({
                name: 'Plumbing item placeholder 03',
                descriptionHeader: 'Plumbing Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 400
            })
        ]
    });
    var electricityCategory = new Category({
        name: 'Electricity',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Electricity item placeholder 01',
                descriptionHeader: 'Electricity Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 50
            }),
            new Service({
                name: 'Electricity item placeholder 02',
                descriptionHeader: 'Electricity Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 400
            }),
            new Service({
                name: 'Electricity item placeholder 03',
                descriptionHeader: 'Electricity Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 2000
            }),
            new Service({
                name: 'Electricity item placeholder 04',
                descriptionHeader: 'Electricity Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 300
            }),
            new Service({
                name: 'Electricity item placeholder 05',
                descriptionHeader: 'Electricity Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 250
            })
        ]
    });
    var masonryCategory = new Category({
        name: 'Masonry',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Masonry item placeholder 01',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 100
            }),
            new Service({
                name: 'Masonry item placeholder 02',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 200
            }),
            new Service({
                name: 'Masonry item placeholder 03',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 150
            }),
            new Service({
                name: 'Masonry item placeholder 04',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 300
            }),
            new Service({
                name: 'Masonry item placeholder 05',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 400
            }),
            new Service({
                name: 'Masonry item placeholder 06',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 250
            }),
            new Service({
                name: 'Masonry item placeholder 07',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 600
            }),
            new Service({
                name: 'Masonry item placeholder 08',
                descriptionHeader: 'Masonry Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 400
            })
        ]
    });
    var heatingAirConditioningCategory = new Category({
        name: 'Heating and air conditioning',
        options: [
            new Option({
                selected: false,
                name: 'Masion/Pavillon',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 2000
            }),
            new Option({
                selected: false,
                name: 'Next Mur de cloture',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                priceType: 'add',
                price: 3000
            })
        ],
        services: [
            new Service({
                name: 'Heating and air conditioning item placeholder 01',
                descriptionHeader: 'Air conditioning Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 150
            }),
            new Service({
                name: 'Heating and air conditioning item placeholder 02',
                descriptionHeader: 'Air conditioning Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 300
            }),
            new Service({
                name: 'Heating and air conditioning item placeholder 03',
                descriptionHeader: 'Air conditioning Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 450
            }),
            new Service({
                name: 'Heating and air conditioning item placeholder 04',
                descriptionHeader: 'Air conditioning Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 50
            }),
            new Service({
                name: 'Heating and air conditioning item placeholder 05',
                descriptionHeader: 'Air conditioning Repair',
                description: 'Vestibulum imperdiet consequat hendrerit. Nunc tortor risus, facilisis efficitur elit ut, malesuada lobortis erat. Quisque laoreet interdum elementum. Sed eget sagittis sem.',
                quantity: 0,
                price: 500
            })
        ]
    });
    allCategorys = [
        crépiEnduitSurNeufCategory,
        carpentryCategory,
        plasterboardInsulationCategory,
        flooringCategory,
        plumbingCategory,
        electricityCategory,
        masonryCategory,
        heatingAirConditioningCategory
    ]
//#endregion
//#region Declorations
    //#region Finding service elements
        var allServiceNames = document.getElementsByClassName('pTool-service-text-name');

        var questionnaireServiceName = document.querySelector('.pTool-service-text-name-questionnaire');
        var serviceHeaderDescription = document.getElementsByClassName('pTool-service-description-header')[0];
        var serviceDescription = document.getElementsByClassName('pTool-service-text-description')[0];
        var serviceQuantitie = document.getElementsByClassName('pTool-quantity-input')[0];
        var servicePrice = document.getElementsByClassName('pTool-service-price-text')[0];
    //#endregion
    //#region Finding all categroy buttons
        var allCategoryButtons = document.getElementsByClassName('category-cube');
        var crépiEnduitSurNeufButton = allCategoryButtons[0];
        var carpentryButton = allCategoryButtons[1];
        var plasterboardInsulationButton = allCategoryButtons[2];
        var flooringButton = allCategoryButtons[3];
        var plumbingButton = allCategoryButtons[4];
        var electricityButton = allCategoryButtons[5];
        var masonryButton = allCategoryButtons[6];
        var heatingAirConditioningButton = allCategoryButtons[7];
    //#endregion
    var allServiceContainers = document.getElementsByClassName('pTool-service-container');
    var currentCategory;

    var subTotalEle = document.querySelector('.pTool-subTotal-dollars');
    var taxEle = document.querySelector('.pTool-tax-dollars');
    var totalEle = document.querySelector('.pTool-total-dollars');

    var questionnaireContainer = document.getElementsByClassName('pTool-questionnaire-container')[0];
    var categoryContainer = document.querySelector('.pTool-service-category-container');
    var backButtons = document.getElementsByClassName('back-button');
    var currentSurvice;
    var currentServiceIndex;

    var nextButton = document.querySelector('.pTool-service-button-next');
    var questionnaireContainers = document.querySelectorAll('.service-grid-container-questionnaire');
    var pricContainer = document.querySelector('.pTool-price-container');

    //#region Option elements
        var optionsContainer = document.querySelector('.pTool-options-container');
        var options = document.getElementsByClassName('pTool-option');
    //#endregion

    //#region userInfo elements
        let userInfoContainer = document.getElementById('pTool-userInfo-container');
        let userInfoNext = document.getElementById('pTool-userInfo-next');
    //#endregion

    //#region extraOp elements
        var xOpsContainer = document.querySelector('#pTool-xOps-container');
        let xOptsNext = document.getElementById('pTool-xOpt-next');
        let xOptContainers = document.getElementsByClassName('pTool-xOp-container');
        let xOptInputContainers = document.getElementsByClassName('pTool-xOp-input-container');
        let xOptSelections = document.querySelectorAll('.pTool-xOp-input.pTool-selection');
        let xOptNumbers = document.querySelectorAll('.pTool-xOp-input.pTool-number');
        let xOptNameEles = document.getElementsByClassName('pTool-xOp-title');
        let xOptCategoryEles = document.getElementsByClassName('pTool-xOp-category');
    //#endregion

    //#region Decision elements
        var desitionTotal = document.getElementById('p-tool-decition-total');
        var decisionContainer = document.querySelector('.pTool-decision-container');
        var showReciptButton = document.querySelector('.p-tool-decition-show-receipt-button');
        var emailReciptButton = document.querySelector('.p-tool-decition-email-receipt-button');
    //#endregion

    //#region Receipt elements
        var receiptContainer = document.querySelector('.pTool-recipts-container');
        var receiptNext = document.querySelector('.pTool-receipt-next');
        var reciptServiceContainers = document.getElementsByClassName('pTool-recipt-container');
        var reciptServiceNames = document.getElementsByClassName('pTool-text-receipt-name');
        var reciptServiceDescriptionHeaders = document.getElementsByClassName('pTool-service-receipt-description-header');
        var reciptServiceDescriptions = document.getElementsByClassName('pTool-service-receipt-description');
        var reciptServiceQuantitys = document.getElementsByClassName('pTool-quantity-receipt-receipt-input');
        var reciptServiceTitle = document.getElementById('pTool-recipt-service-title');
        let reciptCategoryText = document.getElementById('pTool-recipt-category-text');
        let reciptOptionText = document.getElementById('pTool-recipt-option-text');
        let reciptXOptContainer = document.getElementsByClassName('pTool-recipt-xOpt-container');
        let reciptXOptNames = document.getElementsByClassName('pTool-recipt-xOpt-name');
        let reciptXOptCurrents = document.getElementsByClassName('pTool-recipt-xOpt-current');
    //#endregion

    //#region Email input elements
        var emailInputContainer = document.querySelector('.pTool-email-input-container');
        var emailInput = document.querySelector('.pTool-email-input');
        var emailSubmit = document.querySelector('.pTool-email-input-button');
        var emailErrorEle = document.getElementById('email-error');
        var emailAdress = "";
    //#endregion

    //#region Email confermation elements
        var emailConfermationContainer = document.querySelector('.pTool-email-confirmation-container');
        var emailConfermationNext = document.querySelector('.pTool-email-confirmation-button');
        var emailFeedbackLocation = document.getElementById('pTool-email-location');
    //#endregion

    //#region CONSTS
        var EMAIL_END = '</div>';
    //#endregion
//#endregion
//#region Listeners
    //#region Category listeners
        for(let i = 0; i < allCategoryButtons.length; i++){
            allCategoryButtons[i].addEventListener('click', () => {
                hideAllServices();
                navigateTo(optionsContainer);
            });
        }
        crépiEnduitSurNeufButton.addEventListener('click', () => {
            updateServiceContainers(crépiEnduitSurNeufCategory)
        });
        carpentryButton.addEventListener('click', () => {
            updateServiceContainers(carpentryCategory);
        });
        plasterboardInsulationButton.addEventListener('click', () => {
            updateServiceContainers(plasterboardInsulationCategory);
        });
        flooringButton.addEventListener('click', () => {
            updateServiceContainers(flooringCategory);
        });
        plumbingButton.addEventListener('click', () => {
            updateServiceContainers(plumbingCategory);
        });
        electricityButton.addEventListener('click', () => {
            updateServiceContainers(electricityCategory);
        });
        masonryButton.addEventListener('click', () => {
            updateServiceContainers(masonryCategory);
        });
        heatingAirConditioningButton.addEventListener('click', () => {
            updateServiceContainers(heatingAirConditioningCategory);
        });
    //#endregion
    //Options listeners
    for(let i = 0; i < options.length; i++){
        options[i].addEventListener('click', () => {
            let currentOption = currentCategory.getOption(i);
            currentOption.select();
            runXOpts(); 
        });
    }
    //userInfo listeners
    userInfoNext.addEventListener('click', () => {
        showDecisionPage();
        //questionnaireInit();
        //questionnaireService(currentSurvice);
    });
    //xOpts listeners
    xOptsNext.addEventListener('click', () => {
        runUserInfo();
    });
    for(let i = 0; i < xOptSelections.length; i++){
        let currentXOptSelectEle = xOptSelections[i];
        currentXOptSelectEle.addEventListener('change', () => {
            let current = currentXOptSelectEle.value;
            currentCategory.getXOpt(i).setCurrent(current);
            getSubTotalPrice();
        });

        let currentXOptNumberEle = xOptNumbers[i];
        currentXOptNumberEle.addEventListener('change', () => {
            let current = currentXOptNumberEle.value;
            //Add current restraints based on XOpt's max and min
            currentCategory.getXOpt(i).setCurrent(current);
            console.log(currentCategory.getXOpt(i).getCurrent());
            getSubTotalPrice();
        });
    }
    //Decition listeners
    showReciptButton.addEventListener('click', showRecieptPage);
    emailReciptButton.addEventListener('click', () => {
        navigateTo(emailInputContainer);
    });
    //Receipt listeners
    receiptNext.addEventListener('click', () => {
        returnToMain();
    });
    //Email input listeners
    emailSubmit.addEventListener('click', runSubmitButton);
    //Email confermation listeners
    emailConfermationNext.addEventListener('click', () => {
        returnToMain();
    });
    //general listeners
    for(let i = 0; i < backButtons.length; i++){
        backButtons[i].addEventListener('click', returnToMain);
    }
//#endregion
//#region Category button functionality

        function updateServiceContainers(servaceCategory){
            setCurrentServiceCategoryAndIndex(servaceCategory);
            initOptions();
        }
        function setCurrentServiceCategoryAndIndex(servaceCategory){
            currentCategory = servaceCategory;
            currentServiceIndex = 0;
            currentSurvice = currentCategory.getAllServices()[0];
        }
        function removeSelectedFromAllCategorys(){
            for(var i = 0; i < allCategoryButtons.length; i++){
                allCategoryButtons[i].classList.remove('pTool-selected-cube');
            }
        }
        function addSelectedToElement(ele){
            if(!ele.classList.contains('pTool-selected-cube')){
                removeSelectedFromAllCategorys();
                ele.classList.add('pTool-selected-cube');
            }
        }
        function hideAllServices(){
            for(var i = 0; i < allServiceContainers.length; i++){
                if(!allServiceContainers[i].classList.contains('display-none')){
                    allServiceContainers[i].classList.add('display-none');
                }
            }
        }
        function showService(n){
            if(allServiceContainers[n].classList.contains('display-none')){
                allServiceContainers[n].classList.remove('display-none');
            }
        }
//#endregion
//#region Price functionality
    //#region Helper functions
        function getSubTotalPrice(){
            var subTotal = 0;
            allCategorys.forEach(category => {
                category.getAllServices().forEach(service => {
                    var addOnPrice = service.getQuantity() * service.getPrice();
                    subTotal += addOnPrice;
                });
            });

            subTotal = getSubWithOption(subTotal);
            subTotal = getSubWithXOpt(subTotal);

            return subTotal;
        }
        function getSubWithOption(subtotal){
            let newSubtotal = subtotal;
            var selectedOption = getSelectedOption();
            if(!selectedOption){
                return subtotal;
            }
            var optionPrice = selectedOption.getPrice();
            if(selectedOption.getPriceType() === 'add'){
                newSubtotal += optionPrice;
            }
            else if(selectedOption.getPriceType() === 'mull'){
                newSubtotal *= optionPrice;
            }

            return newSubtotal;
        }
        function getSubWithXOpt(subtotal){
            let newSubtotal = subtotal;
            let currentXOpts = currentCategory.getXOpts();
            currentXOpts.forEach((xOpt) => {
                let currentType = xOpt.getType();

                if(currentType === 'selection'){
                    let currentOptionName = xOpt.getCurrent();
                    let currentOption;

                    for(let i = 0; i < xOpt.getOptions().length; i++){
                        let option = xOpt.getOptions()[i];

                        if(option.name === currentOptionName){
                            currentOption = option;
                        }
                    }

                    let amount = currentOption.amount;
                    let operation = currentOption.operation;

                    if(operation === 'add'){
                        newSubtotal += amount;
                    }
                    else if(operation === 'subtract'){
                        newSubtotal -= amount;
                    }
                    else if(operation === 'mull'){
                        newSubtotal *= amount;
                    }
                    else if(operation === 'div'){
                        if(amount === 0){
                            console.error('Canot devide by zero');
                            return;
                        }
                        newSubtotal /= amount; 
                    }
                    else{
                        console.error('Invalid operatior found in xOpt option');
                    }
                }
                else if(currentType === 'number'){
                    let operationObj = xOpt.getOperation();
                    let operation = operationObj.type;
                    let bias = operationObj.bi;
                    let biasOperation = operationObj.biOp;
                    let amount = xOpt.getCurrent();
                    let fixedAmount = operationObj.fixedAmount;
                    let changeAmount = calculateBias(bias, biasOperation, amount, fixedAmount);

                    if(operation === 'add'){
                        newSubtotal += changeAmount;
                    }
                    else if(operation === 'subtract'){
                        newSubtotal -= changeAmount;
                    }
                    else if(operation === 'mul'){
                        newSubtotal *= changeAmount;
                    }
                    else if(operation === 'divide'){
                        if(changeAmount === 0){
                            console.error('canot devide by zero');
                            return;
                        }
                        newSubtotal /= changeAmount;
                    }
                    else{
                        console.error('Invalid operator');
                    }
                }
            });

            return newSubtotal;
        }
        function calculateBias(bias, biasOp, amount, fixedAmount){
            let changeAmount = 0;

            if(biasOp === 'add'){
                changeAmount += fixedAmount;
                changeAmount += (bias * amount);
            }
            else if(biasOp === 'subtract'){
                changeAmount -= fixedAmount;
                changeAmount -= (bias * amount);
            }
            else{
                console.error('Invalid bias operator');
            }

            return changeAmount;
        }
        function getTax(subTotal, tax){
            tax = tax || 0.2;
            var taxCost = Math.round(subTotal * tax);
            return taxCost;
        }
        function getTaxStandAlone(tax){
            tax = tax || 0.2;
            var subTotal = getSubTotalPrice();
            var taxCost = Math.round(subTotal * tax);
            return taxCost;
        }
        function getTotalPrice(subTotal, tax){
            return (subTotal + tax);
        }
        function getTotalPriceStandAlone(){
            var subTotal = getSubTotalPrice();
            var tax = getTax(subTotal);
            return getTotalPrice(subTotal, tax);
        }
        function resetQuantities(){
            allCategorys.forEach(category => {
                category.getAllServices().forEach(service => {
                    service.setQuantity(0);
                });
            });
        }
        function updatePriceContainer(){
            var subTotal = getSubTotalPrice();
            var tax = getTax(subTotal);
            var total = getTotalPrice(subTotal, tax);

            subTotalEle.innerText = ('$' + subTotal);
            taxEle.innerText = ('$' + tax);
            totalEle.innerText = ('$' + total);
        }   
        function createPreiceObject(){
            var priceObj = {
                subTotal: getSubTotalPrice(),
                tax: getTaxStandAlone(),
                totalPrice: getTotalPriceStandAlone()
            };

            return priceObj;
        }
    //#endregion
//#endregion
//#region questionnaire functionality
    nextButton.addEventListener('click', nextQuestionnaire);
    serviceQuantitie.addEventListener('click', quantityValueChange);

    function nextQuestionnaire(){
        if((currentServiceIndex + 1) < currentCategory.getAllServices().length){
            currentServiceIndex += 1;
            updateCurrentServiceAfterIndexChange();
            populatequestionnaireContainer();
        }
        else if((currentServiceIndex + 1) === currentCategory.getAllServices().length){
            showDecisionPage();
        }
    }
    function showDecisionPage(){
        hideAllElements();
        showEle(pricContainer);
        showEle(decisionContainer);
        updatePriceContainer();
        desitionTotal.innerText = getTotalPriceStandAlone();
    }
    function questionnaireInit(){
        hideAllElements();
        showEle(questionnaireContainers[1]);
        showEle(serviceQuantitie);
        hideEle(pricContainer);
    }
    function questionnaireFinishedSceen(){
        questionnaireServiceName.innerText = 'The cost for your reqested service(s) is below';
        giveMTop1(nextButton);
        hideEle(questionnaireContainers[1]);
        hideEle(serviceQuantitie);
        showEle(pricContainer);
    }
    function updateCurrentServiceAfterIndexChange(){
        currentSurvice = currentCategory.getAllServices()[currentServiceIndex];
    }
    function giveServiceContainersEventListeners(){
        for(let i = 0; i < allServiceContainers.length; i++){
            giveServiceContainerEventListener(i);
        }
    }
    function initilizequestionnaireContainer(){
        hideEle(categoryContainer);
        showEle(questionnaireContainer);
    }
    function questionnaireService(currentSurvice){//Incharge of seting questionare screen with data on a normal questionare
        initilizequestionnaireContainer();

        //Geting data
        var serviceName = currentSurvice.getName();
        var serviceHeaderDescriptionText = currentSurvice.getDescriptionHeader();
        var serviceDescriptionText = currentSurvice.getDescription();
        var serviceQuantitieNumber = currentSurvice.getQuantity();

        //Seting data
        questionnaireServiceName.innerText = serviceName;
        serviceHeaderDescription.innerText = serviceHeaderDescriptionText;
        serviceDescription.innerText = serviceDescriptionText;
        serviceQuantitie.value = serviceQuantitieNumber;
    }
    function populatequestionnaireContainer(){
        initilizequestionnaireContainer();

        //Geting data
        var serviceName = currentSurvice.getName();
        var serviceHeaderDescriptionText = currentSurvice.getDescriptionHeader();
        var serviceDescriptionText = currentSurvice.getDescription();
        var serviceQuantitieNumber = currentSurvice.getQuantity();

        //Seting data
        questionnaireServiceName.innerText = serviceName;
        serviceHeaderDescription.innerText = serviceHeaderDescriptionText;
        serviceDescription.innerText = serviceDescriptionText;
        serviceQuantitie.value = serviceQuantitieNumber;
    }
    function returnToMain(){
        hideAllElements();
        resetSelectedOption();
        showEle(categoryContainer);
        removeMTop1(nextButton);
        resetQuantities();
        updatePriceContainer();
    }

    function quantityValueChange(){
        var newQuantity = serviceQuantitie.value;
        currentSurvice.setQuantity(newQuantity);
        updatePriceContainer();
    }
//#endregion
//#region extraOp functionality
function runXOpts(){
    navigateTo(xOpsContainer);
    getSubTotalPrice();
    hideAllXopts();
    displayCorectNumberOfXOptContainers();
    updateXOptHeaders();
    hideAllXOptInputs();
    showReliventXOptTypes();
    removeAllHTMLSectionOptions();
    addReliventHTMLSectionOptions();
}
function hideAllXopts(){
    for(let i = 0; i < xOptContainers.length; i++){
        xOptContainer = xOptContainers[i];
        hideEle(xOptContainer);
    }
}
function displayCorectNumberOfXOptContainers(){
    let currentXOpts = currentCategory.getXOpts();
    for(let i = 0; i < currentXOpts.length; i++){
        showEle(xOptContainers[i]);
    }
}
function hideAllXOptInputs(){
    let currentXOpts = currentCategory.getXOpts();
    for(let i = 0; i < currentXOpts.length; i++){
        let currentSelectionEle = xOptSelections[i];
        let currentNumberEle = xOptNumbers[i];
        hideEle(currentSelectionEle);
        hideEle(currentNumberEle);
    }
}
function showReliventXOptTypes(){
    let currentXOpts = currentCategory.getXOpts();
    for(let i = 0; i < currentXOpts.length; i++){
        let currentType = currentXOpts[i].getType();

        if(currentType === 'selection'){
            let currentSelectionEle = xOptSelections[i];
            showEle(currentSelectionEle);
        }
        else if(currentType === 'number'){
            let currentNumberEle = xOptNumbers[i];
            showEle(currentNumberEle);
        }
        else{
            console.error('Invalid xOpt type specified');
        }
    }
}
function removeAllHTMLSectionOptions(){
    let currentXOpts = currentCategory.getXOpts();
    for(let i = 0; i < currentXOpts.length; i++){
        let currentXOptSelection = xOptSelections[i];
        let options = currentXOptSelection.getElementsByTagName('option');
        if(!options){
            continue;
        }
        while (currentXOptSelection.firstChild) {
            currentXOptSelection.removeChild(currentXOptSelection.firstChild);
        }
    }
}
function updateXOptHeaders(){
    let categoryName = currentCategory.getName();
    let currentXOpts = currentCategory.getXOpts();
    currentXOpts.forEach((xOpt, i) => {
        let currentXOptName = xOpt.getName();
        xOptNameEles[i].innerText = currentXOptName;
        xOptCategoryEles[i].innerText = categoryName;
    });
}
function addReliventHTMLSectionOptions(){
    let currentXOpts = currentCategory.getXOpts();
    for(let i = 0; i < currentXOpts.length; i++){
        let currentXOpt = currentXOpts[i];
        let currentType = currentXOpt.getType();
        if(currentType !== 'selection'){
            continue;
        }
        let allOptions = currentXOpt.getOptions();
        let currentXoptSection = xOptSelections[i];
        for(let j = 0; j < allOptions.length; j++){
            let name = allOptions[j].name;
            let newOptionEle = document.createElement("OPTION");
            newOptionEle.value = name;
            newOptionEle.innerText = name;
            currentXoptSection.appendChild(newOptionEle);
        }
    }
}
//#endregion
//#region Helper functions
    function hideAllElements(){
        hideEle(categoryContainer);
        hideEle(pricContainer);
        hideEle(decisionContainer);
        hideEle(questionnaireContainer);
        hideEle(receiptContainer);
        hideEle(emailInputContainer);
        hideEle(emailConfermationContainer);
        hideEle(emailErrorEle);
        hideEle(optionsContainer);
        hideEle(xOpsContainer);
        hideEle(userInfoContainer);
    }

    function hidequestionnaire(){
        hideEle(questionnaireContainer);
    }
    function giveMTop1(ele){
        ele.classList.add('margin-top-1');
    }
    function removeMTop1(ele){
        while(ele.classList.contains('margin-top-1')){
            ele.classList.remove('margin-top-1');
        }
    }
    function hideEle(ele){
        if(!ele.classList.contains('display-none')){
            ele.classList.add('display-none');
        }
    }
    function showEle(ele){
        while(ele.classList.contains('display-none')){
            ele.classList.remove('display-none');
        }
    }
    function navigateTo(containers){
        hideAllElements();
        if(Array.isArray(containers)){
            containers.forEach((container) => {
                showEle(container);
            });
        }
        else{
            showEle(containers);
        }
    }
    function hideAllRecieptServiceItems(){
        reciptServiceContainers.forEach((container) => {
            hideEle(container);
        });
    }
    function giveRecieptQuantityIntputsEventListeners(){
        for(let i = 0; i < reciptServiceQuantitys.length; i++){
            let input = reciptServiceQuantitys[i];
            //let index = input.dataset
            input.addEventListener('change', () => {
                let currentSurvace = currentCategory.getAllServices()[i];
                currentSurvace.setQuantity(input.value);
                updatePriceContainer();
            });
        }
    }
    function populateRecieptContainer(){
        let categoryTitle = currentCategory.getName();
        let currentOption = currentCategory.getSelectedOption();
        let optionTitle = currentOption.getName();

        reciptCategoryText.innerText = categoryTitle + ":";
        reciptOptionText.innerText = optionTitle;

        hideAllReciptXOpts();
        showAllReliventReciptXOpts();
        populateReciptXOptContainers();

        var reciptTitle = getReciptServiceTitle();
        /*for(let i = 0; i < reciptServiceContainers.length; i++) {
            var currentSurvace = currentCategory.getAllServices()[i];
            var max = currentCategory.getAllServices().length;
            var container = reciptServiceContainers[i];
            var nameEle = reciptServiceNames[i];
            var headerEle = reciptServiceDescriptionHeaders[i];
            var descriptionEle = reciptServiceDescriptions[i];
            var inputEle = reciptServiceQuantitys[i];
            if(i >=max){
                hideEle(container);
            }
            else{
                showEle(container);
                nameEle.innerText = currentSurvace.getName();
                headerEle.innerText = currentSurvace.getDescriptionHeader();
                descriptionEle.innerText = currentSurvace.getDescription();
                inputEle.value = currentSurvace.getQuantity();
            }
        };*/
        reciptServiceTitle.innerText = reciptTitle;
    }
    function hideAllReciptXOpts(){
        let currentReciptXOptContainer;
        for(let i = 0; i < reciptXOptContainer.length; i++){
            currentReciptXOptContainer = reciptXOptContainer[i];
            hideEle(currentReciptXOptContainer);
        }
    }
    function showAllReliventReciptXOpts(){
        let currentReciptXOptContainer;
        for(let i = 0; i < currentCategory.getXOpts().length; i++){
            currentReciptXOptContainer = reciptXOptContainer[i];
            showEle(currentReciptXOptContainer);
        }
    }
    function showRecieptPage(){
        navigateTo([receiptContainer, pricContainer]);
        populateRecieptContainer();
    }
    function populateReciptXOptContainers(){
        let currentReciptXOptName;
        let currentReciptXOptCurrent;
        let currentXOpt;
        for(let i = 0; i < currentCategory.getXOpts().length; i++){
            currentXOpt = currentCategory.getXOpt(i);
            currentReciptXOptName = currentXOpt.getName();
            currentReciptXOptCurrent = !currentXOpt.getCurrent() ? '0' : currentXOpt.getCurrent();

            populateReciptXOptContainer(i, {
                name: currentReciptXOptName,
                current: !currentReciptXOptCurrent ? '0' : currentReciptXOptCurrent
            });
        }
    }
    function populateReciptXOptContainer(i, info){
        let currentReciptXOptName = info.name + ':';
        let currentReciptXOptCurrent = info.current;
        let currentReciptXOptNameEle = reciptXOptNames[i];
        let currentReciptXOptCurrentEle = reciptXOptCurrents[i];

        currentReciptXOptNameEle.innerHTML = currentReciptXOptName;
        currentReciptXOptCurrentEle.innerHTML = currentReciptXOptCurrent;
    }
    function getXOptionData(i){
        let data = {};
        data.name = currentCategory.getXOpt(i).getName();
        data.current = !currentCategory.getXOpt(i).getCurrent() ? '0' : currentCategory.getXOpt(i).getCurrent()
        console.log(data);

        return data;
    }
    function runSubmitButton(){
        emailAdress = emailInput.value;
        if(emailAdress.indexOf('@') < 0){
            showEle(emailErrorEle);
            return;
        }
        //Show Loading loading screen
        sendEmail();
        navigateTo(emailConfermationContainer);
        emailFeedbackLocation.innerText = emailAdress;
    }
    function sendEmail(){
        var bodyMessage = constructEmailBody();
        var sendInfo = {
            SecureToken: '52609d28-a075-4261-bdcf-f548a947fa27', //106fca1a-9df5-4925-84da-dd96526c3104 works
            To : emailAdress,
            From : "developer@singularitythread.com",
            Subject : "pTool details01",
            Body: bodyMessage
        }
    
        Email.send(sendInfo)
        .then(
          message => alert(message)
        );
    }
    function constructEmailBody(){
        var emailBody = '';
        //#region emailBody
        emailBody += '<div>' + 
            '<div style="font-size: 1rem;">' +
            '    Below is a recipt of your services' +
            '</div>' +
            '<div>' +
            '   <p>' + getReciptServiceTitle() + '</p>' +
            '</div>';
        //#region emailXOpts
        emailBody += '<div style="width: 100%;">';
        let xOptRow;
        let xOptData;
        for(let i = 0; i < currentCategory.getXOpts().length; i++){
            getXOptionData(i);
            xOptData = getXOptionData(i);
            xOptRow = constructEmailXOptRow(xOptData);
            emailBody += xOptRow;
        }
        emailBody += '</div>'
        //#endregion
        /*emailBody +=   '<div style="width: 100%;">' +
            '    <div style="display: block;">' + 
            '        <div style="display: flex; width: 100%; box-sizing: border-box; background-color: #DD5962; color: white; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem;">' + 
            '            <div style="width: 30%;">' + 
            '                Service' + 
            '            </div>' +
            '            <div style="width: 60%;">' +
            '                Description' +
            '            </div>' +
            '            <div style="width: 10%;">' +
            '                Quantity' +
            '            </div>' +
            '        </div>' +
            '    </div>';
        //#endregion

        //Construct service rows
        var serviceRow = '';
        currentCategory.getAllServices().forEach((service, i) => {
            serviceRow = construceEmailServiceRow(service, i);
            emailBody += serviceRow;
        });
        emailBody += '</div>'*/

        emailBody += constructEmailTotal();
        
        emailBody += EMAIL_END;

        //For testing run document.querySelector('#test-div').innerHTML = emailBody;

        return emailBody;
    }
    function constructEmailXOptRow(xOptData){
        let xOptRow = '<div style="display: block;">' + 
            '   <div style="display: flex;">' + 
            '       <p>' + 
                        xOptData.name + ': ' +
            '       </p>' + 
            '       <p>' + 
                        xOptData.current + 
            '       </p>' +
            '   </div>' + 
            '</div>';
        
        return xOptRow;
    }
    function construceEmailServiceRow(service, rowIndex){
        var makeBlue = (rowIndex % 2 != 0); //If rowIndex is an odd number
        var serviceRow = '<div style="display: block;' + (makeBlue ? ' background-color: #E0E2E8;' : '') + '">' + 
            '    <div style="display: flex; flex-direction: column;  width: 100%;">' +
            '        <div style="display: flex; width: 100%;">' +
            '            <div style="width: 30%; padding-right: 1rem; padding-left: 0.5rem;">' +
                            service.getName() +
            '            </div>' +
            '            <div style="width: 60%;  padding-right: 1rem;">' +
                            service.getDescription() +
            '            </div>' +
            '            <div style="width: 10%;">' +
                            service.getQuantity() + 
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
            return serviceRow;
    }
    function constructEmailTotal(){
        var price = createPreiceObject();

        var emailTotal = '<div style="border: 0.12rem solid slategray; margin-left: 50%; padding-left: 1rem;">' +
            '    <div style="display: block;">' +
            '        <div style="display: flex; width: 100%">' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">Subtotal:</p>' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">$' + price.subTotal +'</p>' +
            '        </div>' +
            '    </div>' +
            '    <div style="display: block;">' +
            '        <div style="display: flex; width: 100%">' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">Tax:</p>' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">$' + price.tax + '</p>' +
            '        </div>' +
            '    </div>' +
            '    <div style="display: block;">' +
            '        <div style="display: flex; width: 100%">' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">total:</p>' +
            '            <p style="width: 50%; margin-top: 0.25rem; margin-bottom: 0.25rem;">$' + price.totalPrice + '</p>' +
            '        </div>' +
            '    </div>' +
            '</div>';

            return emailTotal;
    }
    //#region Options
        function initOptions(){
            hideAllOptions();
            let optionsLength = currentCategory.getAllOptions().length;
            //iterate through using options length as max
            let options = currentCategory.getAllOptions();
            for(let i = 0; i < optionsLength; i++){
                let currentOptionName = options[i].getName();
                showOption(i);
                populateOption(i, currentOptionName);
            }
        }
        function populateOption(index, optionName){
            options[index].innerText = optionName;
        }
        function hideAllOptions(){
            for(let i = 0; i < options.length; i++){
                let currentOption = options[i];
                hideEle(currentOption);
            }
        }
        function showOption(index){
            let currentOption = options[index];
            showEle(currentOption);
        }
        function getSelectedOption(){
            if(!currentCategory){
                return null;
                console.error('getSelectedOption option was called before catetegory was defined');
            }
            let selectedOption;
            let allCurentOptions = currentCategory.getAllOptions();
            allCurentOptions.forEach((option) => {
                if(option.isSelected()){
                    selectedOption = option;
                }
            });

            return selectedOption;
        }
        function getAllOptions(){
            if(!currentCategory){
                return;
            }
            return currentCategory.getAllOptions();
        }
        function resetSelectedOption(){
            allOptions = getAllOptions();
            if(!allOptions){
                return;
            }
            allOptions.forEach((option) => {
                option.deSelect();
            });
        }
    //#endregion
    function getReciptServiceTitle(){
        var serviceTitle = " ";
        serviceTitle += currentCategory.getName() + " of type " +  getSelectedOption().getName();
        return serviceTitle;
    }
//#endregion
//#region User Info
    function runUserInfo(){
        navigateTo(userInfoContainer);
    }
//#endregion

//Init HTML
(function(){
    giveRecieptQuantityIntputsEventListeners();
})();