/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 10:15 */
$.fn.area = function (option) {
    var index;
    var province = this.find(".province");
    if (!province.length) {
        return
    }
    var city = this.find(".city");
    var county = this.find(".county");
    var Reg = /市|省|自治区|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/;

    function eachData(ele, data) {
        ele.find('option').eq(0).nextAll().remove();
        $(data).each(function (i, t) {
            if (ele === province) {
                if (Reg.test(t.name)) {
                    var str = t.name;
                    ele.append('<option>' + str.replace(Reg, "") + '</option>')
                } else {
                    ele.append('<option>' + t.name + '</option>')
                }
            } else {
                ele.append('<option>' + t.name + '</option>')
            }
        });
        ele[0][0].selected = true;
    }

    eachData(province, data);
    province.on("change", function () {
        index = this.selectedIndex - 1;
        county.find('option').eq(0).nextAll().remove();
        eachData(city, data[index].children);
    });
    city.on("change", function () {
        eachData(county, data[index].children[(this.selectedIndex - 1)].children);
    });
    if (option.province) {
        var indexArr = [];
        $(data).each(function (i, t) {
            if (t.name.indexOf(option.province) >= 0) {
                indexArr.push(i);
                $(t.children).each(function (i, t) {
                    if (t.name == option.city) {
                        indexArr.push(i);
                        $(t.children).each(function (i, t) {
                            if (t.name == option.county) {
                                indexArr.push(i);
                                return false;
                            }
                        })
                        return false;
                    }
                })
                return false;
            }
        })
        if (indexArr.length != 3) {
            return;
        }
        province[0].options[indexArr[0] + 1].selected = true;
        province.change();
        city[0].options[indexArr[1] + 1].selected = true;
        city.change();
        county[0].options[(indexArr[2] || indexArr[1]) + 1].selected = true;
        county.change();
    }
    $([province, city, county]).each(function (i, t) {
        if (t[0].disabled) {
            t[0].disabled = false;
        }
    })
};