var script, callback = () => { if (window.innerWidth < 749) for (var e = document.getElementsByClassName("wk-split__cart__table"), t = 0; t < e.length; t++)for (var r, i = e[t].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), a = 0; a < i.length; a++) { var o = i[a].getElementsByTagName("td"), p = o[4].cloneNode(!0); p.setAttribute("colspan", "1"), i[a].after(p); var s = o[3].cloneNode(!0); s.setAttribute("colspan", "2"), i[a].after(s), o[3].remove() } var n = document.getElementsByClassName("wk-buy"), c = jQuery.ajax({ url: "/cart.js", dataType: "json", cache: !1, success() { void 0 === (wkCartItems = c.responseJSON) && (wkCartItems = JSON.parse(wkCartItems = c.responseText)), items = wkCartItems.items; for (var e = 0; e < n.length; e++)n[e].onclick = function (e) { e.preventDefault(); var t = sessionStorage.getItem("WK_SHOPIFY_SPLIT_CART"); if ("" !== t && null !== t) { var r = this.getAttribute("data-params"), i = this.getAttribute("data-vendor"), a = i.split(" "), o = 0, p = 0; if ($("*[id='route_insurance_" + (a = a.join("_")) + "']").length) { var s = $("*[id='route_insurance_" + a + "']").attr("data-insurance_checked"); ("true" == s || !0 == s) && (p = $("*[id='insurance_price_" + a + "']").attr("data-price"), o = 1, draft_order_enabled = 1) } if ($(".wk_po_count").length && (draft_order_enabled = 1), 1 === draft_order_enabled || 1 == draft_order_enabled) { var n = {}; if (n.status = pickup_by_cart_enabled, 1 == pickup_by_cart_enabled) { var c = i + "attributes-store_pickup"; if (void 0 === $("input[name='" + c + "']:checked")) return !1; var l = $("input[name='" + c + "']:checked").val(); if (n.is_pickup = l, "YES" == l) { var d = $("*[id='cart_pickup_" + a + "']"); if (void 0 !== d && d.val().length > 0) { d = (d = d.val()).split("//"), n.loc = d[1], n.locId = d[0], void 0 !== d[2] && (n.locName = d[2]); var u = []; items.forEach(async function e(t) { if (t.vendor == i) { var r = {}; r[t.variant_id] = t.quantity, u.push(r) } }), jQuery.ajax({ url: server_name + "index.php?p=get_pickup_by_cart", dataType: "jsonp", type: "GET", contentType: "application/json", jsonpCallback: "validateCartLocations", data: { shop_name: Shopify.shop, varient_ids: u, cart_loc: d[0] }, success: function (e) { if ("true" !== $.trim(e)) { var t = "<div class='cart-pickup-error'>   <strong>" + e + "</strong> " + pickup_by_cart_error_message + "</div>"; return document.getElementById("wkCartLocError_" + a).innerHTML = t, $("wkCartLoc_" + vendor).css("background-color", "#ecb9b9"), $("button.wk-buy[data-vendor=" + i + "]").hide(), !1 } draftOrder(items, i, n, { order_insurance_enabled: o, order_insurance_price: p }) } }) } } else draftOrder(items, i, n, { order_insurance_enabled: o, order_insurance_price: p }) } else draftOrder(items, i, n, { order_insurance_enabled: o, order_insurance_price: p }) } else if ("undefined" != document.getElementsByClassName("wk_pay_what_you_want_count_split_cart") && document.getElementsByClassName("wk_pay_what_you_want_count_split_cart").length > 0) draftOrder(items, i, { status: 0 }, { order_insurance_enabled: o, order_insurance_price: p }); else { var v = $(this).parent().parent().parent().parent().children(".wk-order-note"); if (void 0 !== v.children("textarea") && v.children("textarea").length > 0) { var m = v.children("textarea")[0].value; void 0 !== m && "" != m && (r += "?note=" + encodeURIComponent(m)) } var k = !1; items.forEach(async function e(t) { t.vendor == i && void 0 != t.properties && t.properties.length > 0 && (t.properties.store_pickup, k = !0) }); var f = sessionStorage.getItem("WK_SHOPIFY_SPLIT_CART"); if (null !== f) { var g = (f = f.split("&*#*&")).indexOf(i); g > -1 && f.splice(g, 1) } k ? draftOrder(items, i, { status: 0 }, { order_insurance_enabled: o, order_insurance_price: p }) : (sessionStorage.removeItem(i), sessionStorage.setItem("WK_SHOPIFY_SPLIT_CART", f), window.location.href += "/" + r) } } } } }) }; function wkRemoveItem(e) { var t = {}, r = sessionStorage.getItem("WK_SHOPIFY_SPLIT_CART"), i = sessionStorage.getItem("order_note"); if (null !== i && "" !== i && sessionStorage.removeItem("order_note"), "" !== r && null !== r) { r = r.split(","); for (var a = 0; a < r.length; a++) { var o = document.getElementById("cartSpecialInstructions_" + r[a]); void 0 !== o && void 0 != o ? t[r[a]] = o.value : t[r[a]] = "" } var p = JSON.stringify(t); sessionStorage.setItem("order_note", p) } sessionStorage.removeItem(e); var s = sessionStorage.getItem("WK_SHOPIFY_SPLIT_CART"); if (null !== s) { var n = (s = s.split(",")).indexOf(e); n > -1 && s.splice(n, 1), sessionStorage.setItem("WK_SHOPIFY_SPLIT_CART", s) } } function draftOrder(e, t, r, i) { let a = $(".wk_po_count").length, o = meta.page.customerId; if (a) { let p = document.location.href; if (void 0 === o) return window.open("/account/login?checkout_url=" + p + "#wkpreorder", "_top"), !1 } var s = ""; if (2 == split_cart_type && "anno" == t) var n = document.getElementById("cartSpecialInstructions_"); else var n = document.getElementById("cartSpecialInstructions_" + t); if (void 0 !== n && null != n && n.value.length > 0 && (s = n.value), 1 == r.status) { var c = {}, l = []; c.store_pickup_by_cart = r.is_pickup, c.wk_loc_id = r.locId, l.push(c) } else var l = !1; DELIVERY_SLOT_MANAGEMENT_ENABLED && (l = buildDSMAttributes(l, t)), cart_arr = []; var d = 0; e.forEach(async function e(i) { if ("undefined" != typeof split_cart_type) { if (0 == split_cart_type && i.vendor == t) { var a = {}; if (a.title = i.variant_title, a.quantity = i.quantity, a.product_id = i.product_id, a.variant_id = i.variant_id, a.price = i.price, a.handle = i.handle, a.product_title = i.product_title, a.unit_discount = i.total_discount, 1 == r.status) { if (null !== i.properties) "YES" == r.is_pickup ? (i.properties.store_pickup = "YES", i.properties.store_pickup_address = r.loc, void 0 !== r.locName && (i.properties.store_pickup_location_name = r.locName)) : i.properties.store_pickup = "NO"; else { var o = {}; "YES" == r.is_pickup ? (o.store_pickup = "YES", o.store_pickup_address = r.loc, void 0 !== r.locName && (o.store_pickup_location_name = r.locName)) : o.store_pickup = "NO", i.properties = o } } a.properties = i.properties, a.note = s, a.requires_shipping = i.requires_shipping, a.grams = i.grams, cart_arr[d] = a, d++ } else if (1 == split_cart_type && sellers[i.vendor] == t) { var a = {}; if (a.title = i.variant_title, a.quantity = i.quantity, a.product_id = i.product_id, a.variant_id = i.variant_id, a.price = i.price, a.handle = i.handle, a.product_title = i.product_title, a.unit_discount = i.total_discount, 1 == r.status) { if (null !== i.properties) "YES" == r.is_pickup ? (i.properties.store_pickup = "YES", i.properties.store_pickup_address = r.loc, void 0 !== r.locName && (i.properties.store_pickup_location_name = r.locName)) : i.properties.store_pickup = "NO"; else { var o = {}; "YES" == r.is_pickup ? (o.store_pickup = "YES", o.store_pickup_address = r.loc, void 0 !== r.locName && (o.store_pickup_location_name = r.locName)) : o.store_pickup = "NO", i.properties = o } } a.properties = i.properties, a.note = s, a.grams = i.grams, a.requires_shipping = i.requires_shipping, cart_arr[d] = a, d++ } else if (2 == split_cart_type) { if (i.vendor == t && "anno" != t) { var a = {}; if (a.title = i.variant_title, a.quantity = i.quantity, a.product_id = i.product_id, a.variant_id = i.variant_id, a.price = i.price, a.handle = i.handle, a.product_title = i.product_title, a.unit_discount = i.total_discount, 1 == r.status) { if (null !== i.properties) "YES" == r.is_pickup ? (i.properties.store_pickup = "YES", i.properties.store_pickup_address = r.loc, void 0 !== r.locName && (i.properties.store_pickup_location_name = r.locName)) : i.properties.store_pickup = "NO"; else { var o = {}; "YES" == r.is_pickup ? (o.store_pickup = "YES", o.store_pickup_address = r.loc, void 0 !== r.locName && (o.store_pickup_location_name = r.locName)) : o.store_pickup = "NO", i.properties = o } } a.properties = i.properties, a.note = s, a.grams = i.grams, a.requires_shipping = i.requires_shipping, cart_arr[d] = a, d++ } else if ("anno" == t && void 0 !== sellers[i.vendor] && -1 != jQuery.inArray(sellers[i.vendor], exception_country)) { var a = {}; if (a.title = i.variant_title, a.quantity = i.quantity, a.product_id = i.product_id, a.variant_id = i.variant_id, a.price = i.price, a.handle = i.handle, a.product_title = i.product_title, a.unit_discount = i.total_discount, 1 == r.status) { if (null !== i.properties) "YES" == r.is_pickup ? (i.properties.store_pickup = "YES", i.properties.store_pickup_address = r.loc, void 0 !== r.locName && (i.properties.store_pickup_location_name = r.locName)) : i.properties.store_pickup = "NO"; else { var o = {}; "YES" == r.is_pickup ? (o.store_pickup = "YES", o.store_pickup_address = r.loc, void 0 !== r.locName && (o.store_pickup_location_name = r.locName)) : o.store_pickup = "NO", i.properties = o } } a.properties = i.properties, a.note = s, a.grams = i.grams, a.requires_shipping = i.requires_shipping, cart_arr[d] = a, d++ } } } else if (i.vendor == t) { var a = {}; if (a.title = i.variant_title, a.quantity = i.quantity, a.product_id = i.product_id, a.variant_id = i.variant_id, a.price = i.price, a.handle = i.handle, a.product_title = i.product_title, a.unit_discount = i.total_discount, 1 == r.status) { if (null !== i.properties) "YES" == r.is_pickup ? (i.properties.store_pickup = "YES", i.properties.store_pickup_address = r.loc, void 0 !== r.locName && (i.properties.store_pickup_location_name = r.locName)) : i.properties.store_pickup = "NO"; else { var o = {}; "YES" == r.is_pickup ? (o.store_pickup = "YES", o.store_pickup_address = r.loc, void 0 !== r.locName && (o.store_pickup_location_name = r.locName)) : o.store_pickup = "NO", i.properties = o } } a.properties = i.properties, a.note = s, a.grams = i.grams, a.requires_shipping = i.requires_shipping, cart_arr[d] = a, d++ } }), jQuery.ajax({ type: "POST", url: server_name + "index.php?p=ajax_product_properties", cache: !1, data: { callback: "getProductProperties", code: "new", shop_name: Shopify.shop, cart_details: cart_arr, cart_token: wkCartItems.token, note_attribute: l, wk_insurance_selected: i.order_insurance_enabled, wk_routes_insurance_price: i.order_insurance_price, wk_preorder_count: a, customer_id: meta.page.customerId, vendor: t }, success: function (e) { if (console.log(e), "req_qty_not_found" == e) { console.log("preorder error!!!"); var r = $("*[data-vendor='" + t + "']"); r.hide(); let i = SPL.$("<div class='wk_po_msg__div'><p style='color:red; word-wrap:break-word;' >" + wk_preorder_qty_error_label + "</p></div>"); r.after(i) } else "denied" != e && (sessionStorage.setItem("WK_DRAFT_VENDOR", t), window.location.href = e.invoice_url) }, dataType: "json" }) } const buildDSMAttributes = (e, t) => { null != e && Array.isArray(e) || (e = []); let r = document.querySelector(`.dsm-split-cart-widget[data-vendor="${t}"]`), i = {}; return r && (r.querySelectorAll('input[type="hidden"][name*="attributes"]').forEach(e => i[e.name.substring(11, e.name.length - 1)] = e.value), e.push(i)), e }; "undefined" == typeof jQuery ? ((script = document.createElement("script")).type = "text/javascript", script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", document.getElementsByTagName("head")[0].appendChild(script), "complete" !== document.readyState && ("loading" === document.readyState || document.documentElement.doScroll) ? window.addEventListener("load", callback) : callback()) : callback();
