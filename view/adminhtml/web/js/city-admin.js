define([
    'jquery',
    'mage/utils/wrapper',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function ($) {
    'use strict';
    return function () {
        var directoryData = {
            "RO":
                {
                    "name": "Romania",
                    "regions": {
                        "278": {
                            "code": "AB",
                            "name": "Alba",
                            "cities": {
                                "1": {
                                    "name": "Aiud",
                                    "id": "1"
                                },
                                "2": {
                                    "name": "Abrud",
                                    "id": "2"
                                }
                            }
                        },
                        "279": {
                            "code": "AR",
                            "name": "Arad",
                            "cities": {
                                "1": {
                                    "name": "Arad",
                                    "id": "3"
                                },
                                "2": {
                                    "name": "Baia",
                                    "id": "4"
                                }
                            }
                        }
                    }
                }

        };

        var string = JSON.stringify(directoryData),
            obj = JSON.parse(string),
            romania = obj.RO;

        var region_id = $("[name = 'region_id'] option:selected").val(),
            region = romania.regions[region_id],
            city = $("[name*='city']"),
            initialInput = city.val('');

        console.log(city.html());

        if (region_id) {


            var cityHtml = city.parent().html(),
                selectCity = cityHtml.replace("input", "select") + '</select>',
                cityObject = $(selectCity),
                selectedValue = $(cityHtml).val(),
                htmlSelect = '<option></option>',
                selectOptions,
                options,
                optionsAll,
                cityName;


            cityObject.empty();

            $.each(region, function (index, value) {
                if ($.isPlainObject(value)) {
                    $.each(value, function (index, romCity) {
                        cityName = romCity.name;

                        if (selectedValue === cityName) {
                            options = '<option selected value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;
                        }
                        else {
                            optionsAll = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += optionsAll;
                        }
                    })
                }
            });

            selectOptions = cityObject.append(htmlSelect);
            if (typeof region !== 'undefined') {
                city.replaceWith(selectOptions);
            }
        }

        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name*='region_id']", function () {

            var region_id = $(this).val(),
                region = romania.regions[region_id],
                regionName = this.name,
                cityInputName = regionName.replace("region_id", "city");

            if (region_id) {
                var city = $("[name='" + cityInputName + "']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    htmlSelect = '<option></option>',
                    cityName,
                    options,
                    selectOptions;

                cityObject.empty();

                $.each(region, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;

                        })
                    }
                });

                selectOptions = cityObject.append(htmlSelect);

                if (typeof region !== 'undefined') {
                    cityObject.addClass('admin__control-select').removeClass('admin__control-text');
                    city.replaceWith(selectOptions);
                }
                else {
                    cityObject.addClass('admin__control-text').removeClass('admin__control-select');
                    city.replaceWith(initialInput);

                }
            }
        });
    };
});