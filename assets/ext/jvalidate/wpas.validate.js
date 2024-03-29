!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? (module.exports = a(require("jquery"))) : a(jQuery);
})(function (a) {
    a.extend(a.fn, {
        validate: function (b) {
            if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c
                ? c
                : (this.attr("novalidate", "novalidate"),
                  (c = new a.validator(b, this[0])),
                  a.data(this[0], "validator", c),
                  c.settings.onsubmit &&
                      (this.on("click.validate", ":submit", function (b) {
                          c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
                      }),
                      this.on("submit.validate", function (b) {
                          function d() {
                              var d, e;
                              return (
                                  !c.settings.submitHandler ||
                                  (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),
                                  (e = c.settings.submitHandler.call(c, c.currentForm, b)),
                                  c.submitButton && d.remove(),
                                  void 0 !== e && e)
                              );
                          }
                          return c.settings.debug && b.preventDefault(), c.cancelSubmit ? ((c.cancelSubmit = !1), d()) : c.form() ? (c.pendingRequest ? ((c.formSubmitted = !0), !1) : d()) : (c.focusInvalid(), !1);
                      })),
                  c);
        },
        valid: function () {
            var b, c, d;
            return (
                a(this[0]).is("form")
                    ? (b = this.validate().form())
                    : ((d = []),
                      (b = !0),
                      (c = a(this[0].form).validate()),
                      this.each(function () {
                          (b = c.element(this) && b), b || (d = d.concat(c.errorList));
                      }),
                      (c.errorList = d)),
                b
            );
        },
        rules: function (b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j = this[0];
            if (null != j && null != j.form) {
                if (b)
                    switch (((d = a.data(j.form, "validator").settings), (e = d.rules), (f = a.validator.staticRules(j)), b)) {
                        case "add":
                            a.extend(f, a.validator.normalizeRule(c)), delete f.messages, (e[j.name] = f), c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                            break;
                        case "remove":
                            return c
                                ? ((i = {}),
                                  a.each(c.split(/\s/), function (b, c) {
                                      (i[c] = f[c]), delete f[c], "required" === c && a(j).removeAttr("aria-required");
                                  }),
                                  i)
                                : (delete e[j.name], f);
                    }
                return (
                    (g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j)),
                    g.required && ((h = g.required), delete g.required, (g = a.extend({ required: h }, g)), a(j).attr("aria-required", "true")),
                    g.remote && ((h = g.remote), delete g.remote, (g = a.extend(g, { remote: h }))),
                    g
                );
            }
        },
    }),
        a.extend(a.expr.pseudos || a.expr[":"], {
            blank: function (b) {
                return !a.trim("" + a(b).val());
            },
            filled: function (b) {
                var c = a(b).val();
                return null !== c && !!a.trim("" + c);
            },
            unchecked: function (b) {
                return !a(b).prop("checked");
            },
        }),
        (a.validator = function (b, c) {
            (this.settings = a.extend(!0, {}, a.validator.defaults, b)), (this.currentForm = c), this.init();
        }),
        (a.validator.format = function (b, c) {
            return 1 === arguments.length
                ? function () {
                      var c = a.makeArray(arguments);
                      return c.unshift(b), a.validator.format.apply(this, c);
                  }
                : void 0 === c
                ? b
                : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)),
                  c.constructor !== Array && (c = [c]),
                  a.each(c, function (a, c) {
                      b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                          return c;
                      });
                  }),
                  b);
        }),
        a.extend(a.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: a([]),
                errorLabelContainer: a([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (a) {
                    (this.lastActive = a), this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
                },
                onfocusout: function (a) {
                    this.checkable(a) || (!(a.name in this.submitted) && this.optional(a)) || this.element(a);
                },
                onkeyup: function (b, c) {
                    var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                    (9 === c.which && "" === this.elementValue(b)) || a.inArray(c.keyCode, d) !== -1 || ((b.name in this.submitted || b.name in this.invalid) && this.element(b));
                },
                onclick: function (a) {
                    a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
                },
                highlight: function (b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
                },
                unhighlight: function (b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
                },
            },
            setDefaults: function (b) {
                a.extend(a.validator.defaults, b);
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: a.validator.format("Please enter no more than {0} characters."),
                minlength: a.validator.format("Please enter at least {0} characters."),
                rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                range: a.validator.format("Please enter a value between {0} and {1}."),
                max: a.validator.format("Please enter a value less than or equal to {0}."),
                min: a.validator.format("Please enter a value greater than or equal to {0}."),
                step: a.validator.format("Please enter a multiple of {0}."),
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function b(b) {
                        !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]);
                        var c = a.data(this.form, "validator"),
                            d = "on" + b.type.replace(/^validate/, ""),
                            e = c.settings;
                        e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
                    }
                    (this.labelContainer = a(this.settings.errorLabelContainer)),
                        (this.errorContext = (this.labelContainer.length && this.labelContainer) || a(this.currentForm)),
                        (this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer)),
                        (this.submitted = {}),
                        (this.valueCache = {}),
                        (this.pendingRequest = 0),
                        (this.pending = {}),
                        (this.invalid = {}),
                        this.reset();
                    var c,
                        d = (this.groups = {});
                    a.each(this.settings.groups, function (b, c) {
                        "string" == typeof c && (c = c.split(/\s/)),
                            a.each(c, function (a, c) {
                                d[c] = b;
                            });
                    }),
                        (c = this.settings.rules),
                        a.each(c, function (b, d) {
                            c[b] = a.validator.normalizeRule(d);
                        }),
                        a(this.currentForm)
                            .on(
                                "focusin.validate focusout.validate keyup.validate",
                                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",
                                b
                            )
                            .on("click.validate", "select, option, [type='radio'], [type='checkbox']", b),
                        this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler),
                        a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
                },
                form: function () {
                    return this.checkForm(), a.extend(this.submitted, this.errorMap), (this.invalid = a.extend({}, this.errorMap)), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var a = 0, b = (this.currentElements = this.elements()); b[a]; a++) this.check(b[a]);
                    return this.valid();
                },
                element: function (b) {
                    var c,
                        d,
                        e = this.clean(b),
                        f = this.validationTargetFor(e),
                        g = this,
                        h = !0;
                    return (
                        void 0 === f
                            ? delete this.invalid[e.name]
                            : (this.prepareElement(f),
                              (this.currentElements = a(f)),
                              (d = this.groups[f.name]),
                              d &&
                                  a.each(this.groups, function (a, b) {
                                      b === d && a !== f.name && ((e = g.validationTargetFor(g.clean(g.findByName(a)))), e && e.name in g.invalid && (g.currentElements.push(e), (h = g.check(e) && h)));
                                  }),
                              (c = this.check(f) !== !1),
                              (h = h && c),
                              c ? (this.invalid[f.name] = !1) : (this.invalid[f.name] = !0),
                              this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                              this.showErrors(),
                              a(b).attr("aria-invalid", !c)),
                        h
                    );
                },
                showErrors: function (b) {
                    if (b) {
                        var c = this;
                        a.extend(this.errorMap, b),
                            (this.errorList = a.map(this.errorMap, function (a, b) {
                                return { message: a, element: c.findByName(b)[0] };
                            })),
                            (this.successList = a.grep(this.successList, function (a) {
                                return !(a.name in b);
                            }));
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
                },
                resetForm: function () {
                    a.fn.resetForm && a(this.currentForm).resetForm(), (this.invalid = {}), (this.submitted = {}), this.prepareForm(), this.hideErrors();
                    var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                    this.resetElements(b);
                },
                resetElements: function (a) {
                    var b;
                    if (this.settings.unhighlight) for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                    else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid);
                },
                objectLength: function (a) {
                    var b,
                        c = 0;
                    for (b in a) a[b] && c++;
                    return c;
                },
                hideErrors: function () {
                    this.hideThese(this.toHide);
                },
                hideThese: function (a) {
                    a.not(this.containers).text(""), this.addWrapper(a).hide();
                },
                valid: function () {
                    return 0 === this.size();
                },
                size: function () {
                    return this.errorList.length;
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid)
                        try {
                            a(this.findLastActive() || (this.errorList.length && this.errorList[0].element) || [])
                                .filter(":visible")
                                .focus()
                                .trigger("focusin");
                        } catch (b) {}
                },
                findLastActive: function () {
                    var b = this.lastActive;
                    return (
                        b &&
                        1 ===
                            a.grep(this.errorList, function (a) {
                                return a.element.name === b.name;
                            }).length &&
                        b
                    );
                },
                elements: function () {
                    var b = this,
                        c = {};
                    return a(this.currentForm)
                        .find("input, select, textarea, [contenteditable]")
                        .not(":submit, :reset, :image, :disabled")
                        .not(this.settings.ignore)
                        .filter(function () {
                            var d = this.name || a(this).attr("name");
                            return (
                                !d && b.settings.debug && window.console && console.error("%o has no name assigned", this),
                                this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]),
                                !(d in c || !b.objectLength(a(this).rules())) && ((c[d] = !0), !0)
                            );
                        });
                },
                clean: function (b) {
                    return a(b)[0];
                },
                errors: function () {
                    var b = this.settings.errorClass.split(" ").join(".");
                    return a(this.settings.errorElement + "." + b, this.errorContext);
                },
                resetInternals: function () {
                    (this.successList = []), (this.errorList = []), (this.errorMap = {}), (this.toShow = a([])), (this.toHide = a([]));
                },
                reset: function () {
                    this.resetInternals(), (this.currentElements = a([]));
                },
                prepareForm: function () {
                    this.reset(), (this.toHide = this.errors().add(this.containers));
                },
                prepareElement: function (a) {
                    this.reset(), (this.toHide = this.errorsFor(a));
                },
                elementValue: function (b) {
                    var c,
                        d,
                        e = a(b),
                        f = b.type;
                    return "radio" === f || "checkbox" === f
                        ? this.findByName(b.name).filter(":checked").val()
                        : "number" === f && "undefined" != typeof b.validity
                        ? b.validity.badInput
                            ? "NaN"
                            : e.val()
                        : ((c = b.hasAttribute("contenteditable") ? e.text() : e.val()),
                          "file" === f
                              ? "C:\\fakepath\\" === c.substr(0, 12)
                                  ? c.substr(12)
                                  : ((d = c.lastIndexOf("/")), d >= 0 ? c.substr(d + 1) : ((d = c.lastIndexOf("\\")), d >= 0 ? c.substr(d + 1) : c))
                              : "string" == typeof c
                              ? c.replace(/\r/g, "")
                              : c);
                },
                check: function (b) {
                    b = this.validationTargetFor(this.clean(b));
                    var c,
                        d,
                        e,
                        f = a(b).rules(),
                        g = a.map(f, function (a, b) {
                            return b;
                        }).length,
                        h = !1,
                        i = this.elementValue(b);
                    if ("function" == typeof f.normalizer) {
                        if (((i = f.normalizer.call(b, i)), "string" != typeof i)) throw new TypeError("The normalizer should return a string value.");
                        delete f.normalizer;
                    }
                    for (d in f) {
                        e = { method: d, parameters: f[d] };
                        try {
                            if (((c = a.validator.methods[d].call(this, i, b, e.parameters)), "dependency-mismatch" === c && 1 === g)) {
                                h = !0;
                                continue;
                            }
                            if (((h = !1), "pending" === c)) return void (this.toHide = this.toHide.not(this.errorsFor(b)));
                            if (!c) return this.formatAndAdd(b, e), !1;
                        } catch (j) {
                            throw (
                                (this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j),
                                j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."),
                                j)
                            );
                        }
                    }
                    if (!h) return this.objectLength(f) && this.successList.push(b), !0;
                },
                customDataMessage: function (b, c) {
                    return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
                },
                customMessage: function (a, b) {
                    var c = this.settings.messages[a];
                    return c && (c.constructor === String ? c : c[b]);
                },
                findDefined: function () {
                    for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a];
                },
                defaultMessage: function (b, c) {
                    "string" == typeof c && (c = { method: c });
                    var d = this.findDefined(
                            this.customMessage(b.name, c.method),
                            this.customDataMessage(b, c.method),
                            (!this.settings.ignoreTitle && b.title) || void 0,
                            a.validator.messages[c.method],
                            "<strong>Warning: No message defined for " + b.name + "</strong>"
                        ),
                        e = /\$?\{(\d+)\}/g;
                    return "function" == typeof d ? (d = d.call(this, c.parameters, b)) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
                },
                formatAndAdd: function (a, b) {
                    var c = this.defaultMessage(a, b);
                    this.errorList.push({ message: c, element: a, method: b.method }), (this.errorMap[a.name] = c), (this.submitted[a.name] = c);
                },
                addWrapper: function (a) {
                    return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
                },
                defaultShowErrors: function () {
                    var a, b, c;
                    for (a = 0; this.errorList[a]; a++)
                        (c = this.errorList[a]), this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                    if ((this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                    if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                    (this.toHide = this.toHide.not(this.toShow)), this.hideErrors(), this.addWrapper(this.toShow).show();
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements());
                },
                invalidElements: function () {
                    return a(this.errorList).map(function () {
                        return this.element;
                    });
                },
                showLabel: function (b, c) {
                    var d,
                        e,
                        f,
                        g,
                        h = this.errorsFor(b),
                        i = this.idOrName(b),
                        j = a(b).attr("aria-describedby");
                    h.length
                        ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c))
                        : ((h = a("<" + this.settings.errorElement + ">")
                              .attr("id", i + "-error")
                              .addClass(this.settings.errorClass)
                              .html(c || "")),
                          (d = h),
                          this.settings.wrapper &&
                              (d = h
                                  .hide()
                                  .show()
                                  .wrap("<" + this.settings.wrapper + "/>")
                                  .parent()),
                          this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b),
                          h.is("label")
                              ? h.attr("for", i)
                              : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length &&
                                ((f = h.attr("id")),
                                j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : (j = f),
                                a(b).attr("aria-describedby", j),
                                (e = this.groups[b.name]),
                                e &&
                                    ((g = this),
                                    a.each(g.groups, function (b, c) {
                                        c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
                                    })))),
                        !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)),
                        (this.toShow = this.toShow.add(h));
                },
                errorsFor: function (b) {
                    var c = this.escapeCssMeta(this.idOrName(b)),
                        d = a(b).attr("aria-describedby"),
                        e = "label[for='" + c + "'], label[for='" + c + "'] *";
                    return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
                },
                escapeCssMeta: function (a) {
                    return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
                },
                idOrName: function (a) {
                    return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
                },
                validationTargetFor: function (b) {
                    return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
                },
                checkable: function (a) {
                    return /radio|checkbox/i.test(a.type);
                },
                findByName: function (b) {
                    return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
                },
                getLength: function (b, c) {
                    switch (c.nodeName.toLowerCase()) {
                        case "select":
                            return a("option:selected", c).length;
                        case "input":
                            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;
                    }
                    return b.length;
                },
                depend: function (a, b) {
                    return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b);
                },
                dependTypes: {
                    boolean: function (a) {
                        return a;
                    },
                    string: function (b, c) {
                        return !!a(b, c.form).length;
                    },
                    function: function (a, b) {
                        return a(b);
                    },
                },
                optional: function (b) {
                    var c = this.elementValue(b);
                    return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
                },
                startRequest: function (b) {
                    this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), (this.pending[b.name] = !0));
                },
                stopRequest: function (b, c) {
                    this.pendingRequest--,
                        this.pendingRequest < 0 && (this.pendingRequest = 0),
                        delete this.pending[b.name],
                        a(b).removeClass(this.settings.pendingClass),
                        c && 0 === this.pendingRequest && this.formSubmitted && this.form()
                            ? (a(this.currentForm).submit(), (this.formSubmitted = !1))
                            : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), (this.formSubmitted = !1));
                },
                previousValue: function (b, c) {
                    return (c = ("string" == typeof c && c) || "remote"), a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) });
                },
                destroy: function () {
                    this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
                },
            },
            classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
            addClassRules: function (b, c) {
                b.constructor === String ? (this.classRuleSettings[b] = c) : a.extend(this.classRuleSettings, b);
            },
            classRules: function (b) {
                var c = {},
                    d = a(b).attr("class");
                return (
                    d &&
                        a.each(d.split(" "), function () {
                            this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
                        }),
                    c
                );
            },
            normalizeAttributeRule: function (a, b, c, d) {
                /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && ((d = Number(d)), isNaN(d) && (d = void 0)), d || 0 === d ? (a[c] = d) : b === c && "range" !== b && (a[c] = !0);
            },
            attributeRules: function (b) {
                var c,
                    d,
                    e = {},
                    f = a(b),
                    g = b.getAttribute("type");
                for (c in a.validator.methods) "required" === c ? ((d = b.getAttribute(c)), "" === d && (d = !0), (d = !!d)) : (d = f.attr(c)), this.normalizeAttributeRule(e, g, c, d);
                return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
            },
            dataRules: function (b) {
                var c,
                    d,
                    e = {},
                    f = a(b),
                    g = b.getAttribute("type");
                for (c in a.validator.methods) (d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase())), this.normalizeAttributeRule(e, g, c, d);
                return e;
            },
            staticRules: function (b) {
                var c = {},
                    d = a.data(b.form, "validator");
                return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
            },
            normalizeRules: function (b, c) {
                return (
                    a.each(b, function (d, e) {
                        if (e === !1) return void delete b[d];
                        if (e.param || e.depends) {
                            var f = !0;
                            switch (typeof e.depends) {
                                case "string":
                                    f = !!a(e.depends, c.form).length;
                                    break;
                                case "function":
                                    f = e.depends.call(c, c);
                            }
                            f ? (b[d] = void 0 === e.param || e.param) : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
                        }
                    }),
                    a.each(b, function (d, e) {
                        b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e;
                    }),
                    a.each(["minlength", "maxlength"], function () {
                        b[this] && (b[this] = Number(b[this]));
                    }),
                    a.each(["rangelength", "range"], function () {
                        var c;
                        b[this] && (a.isArray(b[this]) ? (b[this] = [Number(b[this][0]), Number(b[this][1])]) : "string" == typeof b[this] && ((c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/)), (b[this] = [Number(c[0]), Number(c[1])])));
                    }),
                    a.validator.autoCreateRanges &&
                        (null != b.min && null != b.max && ((b.range = [b.min, b.max]), delete b.min, delete b.max),
                        null != b.minlength && null != b.maxlength && ((b.rangelength = [b.minlength, b.maxlength]), delete b.minlength, delete b.maxlength)),
                    b
                );
            },
            normalizeRule: function (b) {
                if ("string" == typeof b) {
                    var c = {};
                    a.each(b.split(/\s/), function () {
                        c[this] = !0;
                    }),
                        (b = c);
                }
                return b;
            },
            addMethod: function (b, c, d) {
                (a.validator.methods[b] = c), (a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b]), c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
            },
            methods: {
                required: function (b, c, d) {
                    if (!this.depend(d, c)) return "dependency-mismatch";
                    if ("select" === c.nodeName.toLowerCase()) {
                        var e = a(c).val();
                        return e && e.length > 0;
                    }
                    return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0;
                },
                email: function (a, b) {
                    return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
                },
                url: function (a, b) {
                    return (
                        this.optional(b) ||
                        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                            a
                        )
                    );
                },
                date: function (a, b) {
                    return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
                },
                dateISO: function (a, b) {
                    return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
                },
                number: function (a, b) {
                    return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
                },
                digits: function (a, b) {
                    return this.optional(b) || /^\d+$/.test(a);
                },
                minlength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || e >= d;
                },
                maxlength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || e <= d;
                },
                rangelength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || (e >= d[0] && e <= d[1]);
                },
                min: function (a, b, c) {
                    return this.optional(b) || a >= c;
                },
                max: function (a, b, c) {
                    return this.optional(b) || a <= c;
                },
                range: function (a, b, c) {
                    return this.optional(b) || (a >= c[0] && a <= c[1]);
                },
                step: function (b, c, d) {
                    var e,
                        f = a(c).attr("type"),
                        g = "Step attribute on input type " + f + " is not supported.",
                        h = ["text", "number", "range"],
                        i = new RegExp("\\b" + f + "\\b"),
                        j = f && !i.test(h.join()),
                        k = function (a) {
                            var b = ("" + a).match(/(?:\.(\d+))?$/);
                            return b && b[1] ? b[1].length : 0;
                        },
                        l = function (a) {
                            return Math.round(a * Math.pow(10, e));
                        },
                        m = !0;
                    if (j) throw new Error(g);
                    return (e = k(d)), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m;
                },
                equalTo: function (b, c, d) {
                    var e = a(d);
                    return (
                        this.settings.onfocusout &&
                            e.not(".validate-equalTo-blur").length &&
                            e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                                a(c).valid();
                            }),
                        b === e.val()
                    );
                },
                remote: function (b, c, d, e) {
                    if (this.optional(c)) return "dependency-mismatch";
                    e = ("string" == typeof e && e) || "remote";
                    var f,
                        g,
                        h,
                        i = this.previousValue(c, e);
                    return (
                        this.settings.messages[c.name] || (this.settings.messages[c.name] = {}),
                        (i.originalMessage = i.originalMessage || this.settings.messages[c.name][e]),
                        (this.settings.messages[c.name][e] = i.message),
                        (d = ("string" == typeof d && { url: d }) || d),
                        (h = a.param(a.extend({ data: b }, d.data))),
                        i.old === h
                            ? i.valid
                            : ((i.old = h),
                              (f = this),
                              this.startRequest(c),
                              (g = {}),
                              (g[c.name] = b),
                              a.ajax(
                                  a.extend(
                                      !0,
                                      {
                                          mode: "abort",
                                          port: "validate" + c.name,
                                          dataType: "json",
                                          data: g,
                                          context: f.currentForm,
                                          success: function (a) {
                                              var d,
                                                  g,
                                                  h,
                                                  j = a === !0 || "true" === a;
                                              (f.settings.messages[c.name][e] = i.originalMessage),
                                                  j
                                                      ? ((h = f.formSubmitted), f.resetInternals(), (f.toHide = f.errorsFor(c)), (f.formSubmitted = h), f.successList.push(c), (f.invalid[c.name] = !1), f.showErrors())
                                                      : ((d = {}), (g = a || f.defaultMessage(c, { method: e, parameters: b })), (d[c.name] = i.message = g), (f.invalid[c.name] = !0), f.showErrors(d)),
                                                  (i.valid = j),
                                                  f.stopRequest(c, j);
                                          },
                                      },
                                      d
                                  )
                              ),
                              "pending")
                    );
                },
            },
        });
    var b,
        c = {};
    return (
        a.ajaxPrefilter
            ? a.ajaxPrefilter(function (a, b, d) {
                  var e = a.port;
                  "abort" === a.mode && (c[e] && c[e].abort(), (c[e] = d));
              })
            : ((b = a.ajax),
              (a.ajax = function (d) {
                  var e = ("mode" in d ? d : a.ajaxSettings).mode,
                      f = ("port" in d ? d : a.ajaxSettings).port;
                  return "abort" === e ? (c[f] && c[f].abort(), (c[f] = b.apply(this, arguments)), c[f]) : b.apply(this, arguments);
              })),
        a
    );
});
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./jquery.validate.min"], a) : "object" == typeof module && module.exports ? (module.exports = a(require("jquery"))) : a(jQuery);
})(function (a) {
    return (
        (function () {
            function b(a) {
                return a
                    .replace(/<.[^<>]*?>/g, " ")
                    .replace(/&nbsp;|&#160;/gi, " ")
                    .replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
            }
            a.validator.addMethod(
                "maxWords",
                function (a, c, d) {
                    return this.optional(c) || b(a).match(/\b\w+\b/g).length <= d;
                },
                a.validator.format("Please enter {0} words or less.")
            ),
                a.validator.addMethod(
                    "minWords",
                    function (a, c, d) {
                        return this.optional(c) || b(a).match(/\b\w+\b/g).length >= d;
                    },
                    a.validator.format("Please enter at least {0} words.")
                ),
                a.validator.addMethod(
                    "rangeWords",
                    function (a, c, d) {
                        var e = b(a),
                            f = /\b\w+\b/g;
                        return this.optional(c) || (e.match(f).length >= d[0] && e.match(f).length <= d[1]);
                    },
                    a.validator.format("Please enter between {0} and {1} words.")
                );
        })(),
        a.validator.addMethod(
            "accept",
            function (b, c, d) {
                var e,
                    f,
                    g,
                    h = "string" == typeof d ? d.replace(/\s/g, "") : "image/*",
                    i = this.optional(c);
                if (i) return i;
                if (
                    "file" === a(c).attr("type") &&
                    ((h = h
                        .replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&")
                        .replace(/,/g, "|")
                        .replace(/\/\*/g, "/.*")),
                    c.files && c.files.length)
                )
                    for (g = new RegExp(".?(" + h + ")$", "i"), e = 0; e < c.files.length; e++) if (((f = c.files[e]), !f.type.match(g))) return !1;
                return !0;
            },
            a.validator.format("Please enter a value with a valid mimetype.")
        ),
        a.validator.addMethod(
            "alphanumeric",
            function (a, b) {
                return this.optional(b) || /^\w+$/i.test(a);
            },
            "Letters, numbers, and underscores only please"
        ),
        a.validator.addMethod(
            "bankaccountNL",
            function (a, b) {
                if (this.optional(b)) return !0;
                if (!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(a)) return !1;
                var c,
                    d,
                    e,
                    f = a.replace(/ /g, ""),
                    g = 0,
                    h = f.length;
                for (c = 0; c < h; c++) (d = h - c), (e = f.substring(c, c + 1)), (g += d * e);
                return g % 11 === 0;
            },
            "Please specify a valid bank account number"
        ),
        a.validator.addMethod(
            "bankorgiroaccountNL",
            function (b, c) {
                return this.optional(c) || a.validator.methods.bankaccountNL.call(this, b, c) || a.validator.methods.giroaccountNL.call(this, b, c);
            },
            "Please specify a valid bank or giro account number"
        ),
        a.validator.addMethod(
            "bic",
            function (a, b) {
                return this.optional(b) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(a.toUpperCase());
            },
            "Please specify a valid BIC code"
        ),
        a.validator.addMethod(
            "cifES",
            function (a) {
                "use strict";
                function b(a) {
                    return a % 2 === 0;
                }
                var c,
                    d,
                    e,
                    f,
                    g = new RegExp(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/gi),
                    h = a.substring(0, 1),
                    i = a.substring(1, 8),
                    j = a.substring(8, 9),
                    k = 0,
                    l = 0,
                    m = 0;
                if (9 !== a.length || !g.test(a)) return !1;
                for (c = 0; c < i.length; c++) (d = parseInt(i[c], 10)), b(c) ? ((d *= 2), (m += d < 10 ? d : d - 9)) : (l += d);
                return (
                    (k = l + m),
                    (e = (10 - k.toString().substr(-1)).toString()),
                    (e = parseInt(e, 10) > 9 ? "0" : e),
                    (f = "JABCDEFGHI".substr(e, 1).toString()),
                    h.match(/[ABEH]/) ? j === e : h.match(/[KPQS]/) ? j === f : j === e || j === f
                );
            },
            "Please specify a valid CIF number."
        ),
        a.validator.addMethod(
            "cpfBR",
            function (a) {
                if (((a = a.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "")), 11 !== a.length)) return !1;
                var b,
                    c,
                    d,
                    e,
                    f = 0;
                if (
                    ((b = parseInt(a.substring(9, 10), 10)),
                    (c = parseInt(a.substring(10, 11), 10)),
                    (d = function (a, b) {
                        var c = (10 * a) % 11;
                        return (10 !== c && 11 !== c) || (c = 0), c === b;
                    }),
                    "" === a ||
                        "00000000000" === a ||
                        "11111111111" === a ||
                        "22222222222" === a ||
                        "33333333333" === a ||
                        "44444444444" === a ||
                        "55555555555" === a ||
                        "66666666666" === a ||
                        "77777777777" === a ||
                        "88888888888" === a ||
                        "99999999999" === a)
                )
                    return !1;
                for (e = 1; e <= 9; e++) f += parseInt(a.substring(e - 1, e), 10) * (11 - e);
                if (d(f, b)) {
                    for (f = 0, e = 1; e <= 10; e++) f += parseInt(a.substring(e - 1, e), 10) * (12 - e);
                    return d(f, c);
                }
                return !1;
            },
            "Please specify a valid CPF number"
        ),
        a.validator.addMethod(
            "creditcard",
            function (a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c,
                    d,
                    e = 0,
                    f = 0,
                    g = !1;
                if (((a = a.replace(/\D/g, "")), a.length < 13 || a.length > 19)) return !1;
                for (c = a.length - 1; c >= 0; c--) (d = a.charAt(c)), (f = parseInt(d, 10)), g && (f *= 2) > 9 && (f -= 9), (e += f), (g = !g);
                return e % 10 === 0;
            },
            "Please enter a valid credit card number."
        ),
        a.validator.addMethod(
            "creditcardtypes",
            function (a, b, c) {
                if (/[^0-9\-]+/.test(a)) return !1;
                a = a.replace(/\D/g, "");
                var d = 0;
                return (
                    c.mastercard && (d |= 1),
                    c.visa && (d |= 2),
                    c.amex && (d |= 4),
                    c.dinersclub && (d |= 8),
                    c.enroute && (d |= 16),
                    c.discover && (d |= 32),
                    c.jcb && (d |= 64),
                    c.unknown && (d |= 128),
                    c.all && (d = 255),
                    1 & d && /^(5[12345])/.test(a)
                        ? 16 === a.length
                        : 2 & d && /^(4)/.test(a)
                        ? 16 === a.length
                        : 4 & d && /^(3[47])/.test(a)
                        ? 15 === a.length
                        : 8 & d && /^(3(0[012345]|[68]))/.test(a)
                        ? 14 === a.length
                        : 16 & d && /^(2(014|149))/.test(a)
                        ? 15 === a.length
                        : 32 & d && /^(6011)/.test(a)
                        ? 16 === a.length
                        : 64 & d && /^(3)/.test(a)
                        ? 16 === a.length
                        : 64 & d && /^(2131|1800)/.test(a)
                        ? 15 === a.length
                        : !!(128 & d)
                );
            },
            "Please enter a valid credit card number."
        ),
        a.validator.addMethod(
            "currency",
            function (a, b, c) {
                var d,
                    e = "string" == typeof c,
                    f = e ? c : c[0],
                    g = !!e || c[1];
                return (
                    (f = f.replace(/,/g, "")),
                    (f = g ? f + "]" : f + "]?"),
                    (d = "^[" + f + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$"),
                    (d = new RegExp(d)),
                    this.optional(b) || d.test(a)
                );
            },
            "Please specify a valid currency"
        ),
        a.validator.addMethod(
            "dateFA",
            function (a, b) {
                return this.optional(b) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(a);
            },
            a.validator.messages.date
        ),
        a.validator.addMethod(
            "dateITA",
            function (a, b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h = !1,
                    i = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                return (
                    i.test(a)
                        ? ((c = a.split("/")),
                          (d = parseInt(c[0], 10)),
                          (e = parseInt(c[1], 10)),
                          (f = parseInt(c[2], 10)),
                          (g = new Date(Date.UTC(f, e - 1, d, 12, 0, 0, 0))),
                          (h = g.getUTCFullYear() === f && g.getUTCMonth() === e - 1 && g.getUTCDate() === d))
                        : (h = !1),
                    this.optional(b) || h
                );
            },
            a.validator.messages.date
        ),
        a.validator.addMethod(
            "dateNL",
            function (a, b) {
                return this.optional(b) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(a);
            },
            a.validator.messages.date
        ),
        a.validator.addMethod(
            "extension",
            function (a, b, c) {
                return (c = "string" == typeof c ? c.replace(/,/g, "|") : "png|jpe?g|gif"), this.optional(b) || a.match(new RegExp("\\.(" + c + ")$", "i"));
            },
            a.validator.format("Please enter a value with a valid extension.")
        ),
        a.validator.addMethod(
            "giroaccountNL",
            function (a, b) {
                return this.optional(b) || /^[0-9]{1,7}$/.test(a);
            },
            "Please specify a valid giro account number"
        ),
        a.validator.addMethod(
            "iban",
            function (a, b) {
                if (this.optional(b)) return !0;
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l = a.replace(/ /g, "").toUpperCase(),
                    m = "",
                    n = !0,
                    o = "",
                    p = "",
                    q = 5;
                if (l.length < q) return !1;
                if (
                    ((c = l.substring(0, 2)),
                    (h = {
                        AL: "\\d{8}[\\dA-Z]{16}",
                        AD: "\\d{8}[\\dA-Z]{12}",
                        AT: "\\d{16}",
                        AZ: "[\\dA-Z]{4}\\d{20}",
                        BE: "\\d{12}",
                        BH: "[A-Z]{4}[\\dA-Z]{14}",
                        BA: "\\d{16}",
                        BR: "\\d{23}[A-Z][\\dA-Z]",
                        BG: "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
                        CR: "\\d{17}",
                        HR: "\\d{17}",
                        CY: "\\d{8}[\\dA-Z]{16}",
                        CZ: "\\d{20}",
                        DK: "\\d{14}",
                        DO: "[A-Z]{4}\\d{20}",
                        EE: "\\d{16}",
                        FO: "\\d{14}",
                        FI: "\\d{14}",
                        FR: "\\d{10}[\\dA-Z]{11}\\d{2}",
                        GE: "[\\dA-Z]{2}\\d{16}",
                        DE: "\\d{18}",
                        GI: "[A-Z]{4}[\\dA-Z]{15}",
                        GR: "\\d{7}[\\dA-Z]{16}",
                        GL: "\\d{14}",
                        GT: "[\\dA-Z]{4}[\\dA-Z]{20}",
                        HU: "\\d{24}",
                        IS: "\\d{22}",
                        IE: "[\\dA-Z]{4}\\d{14}",
                        IL: "\\d{19}",
                        IT: "[A-Z]\\d{10}[\\dA-Z]{12}",
                        KZ: "\\d{3}[\\dA-Z]{13}",
                        KW: "[A-Z]{4}[\\dA-Z]{22}",
                        LV: "[A-Z]{4}[\\dA-Z]{13}",
                        LB: "\\d{4}[\\dA-Z]{20}",
                        LI: "\\d{5}[\\dA-Z]{12}",
                        LT: "\\d{16}",
                        LU: "\\d{3}[\\dA-Z]{13}",
                        MK: "\\d{3}[\\dA-Z]{10}\\d{2}",
                        MT: "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
                        MR: "\\d{23}",
                        MU: "[A-Z]{4}\\d{19}[A-Z]{3}",
                        MC: "\\d{10}[\\dA-Z]{11}\\d{2}",
                        MD: "[\\dA-Z]{2}\\d{18}",
                        ME: "\\d{18}",
                        NL: "[A-Z]{4}\\d{10}",
                        NO: "\\d{11}",
                        PK: "[\\dA-Z]{4}\\d{16}",
                        PS: "[\\dA-Z]{4}\\d{21}",
                        PL: "\\d{24}",
                        PT: "\\d{21}",
                        RO: "[A-Z]{4}[\\dA-Z]{16}",
                        SM: "[A-Z]\\d{10}[\\dA-Z]{12}",
                        SA: "\\d{2}[\\dA-Z]{18}",
                        RS: "\\d{18}",
                        SK: "\\d{20}",
                        SI: "\\d{15}",
                        ES: "\\d{20}",
                        SE: "\\d{20}",
                        CH: "\\d{5}[\\dA-Z]{12}",
                        TN: "\\d{20}",
                        TR: "\\d{5}[\\dA-Z]{17}",
                        AE: "\\d{3}\\d{16}",
                        GB: "[A-Z]{4}\\d{14}",
                        VG: "[\\dA-Z]{4}\\d{16}",
                    }),
                    (g = h[c]),
                    "undefined" != typeof g && ((i = new RegExp("^[A-Z]{2}\\d{2}" + g + "$", "")), !i.test(l)))
                )
                    return !1;
                for (d = l.substring(4, l.length) + l.substring(0, 4), j = 0; j < d.length; j++) (e = d.charAt(j)), "0" !== e && (n = !1), n || (m += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e));
                for (k = 0; k < m.length; k++) (f = m.charAt(k)), (p = "" + o + f), (o = p % 97);
                return 1 === o;
            },
            "Please specify a valid IBAN"
        ),
        a.validator.addMethod(
            "integer",
            function (a, b) {
                return this.optional(b) || /^-?\d+$/.test(a);
            },
            "A positive or negative non-decimal number please"
        ),
        a.validator.addMethod(
            "ipv4",
            function (a, b) {
                return this.optional(b) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(a);
            },
            "Please enter a valid IP v4 address."
        ),
        a.validator.addMethod(
            "ipv6",
            function (a, b) {
                return (
                    this.optional(b) ||
                    /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(
                        a
                    )
                );
            },
            "Please enter a valid IP v6 address."
        ),
        a.validator.addMethod(
            "lettersonly",
            function (a, b) {
                return this.optional(b) || /^[a-z]+$/i.test(a);
            },
            "Letters only please"
        ),
        a.validator.addMethod(
            "letterswithbasicpunc",
            function (a, b) {
                return this.optional(b) || /^[a-z\-.,()'"\s]+$/i.test(a);
            },
            "Letters or punctuation only please"
        ),
        a.validator.addMethod(
            "mobileNL",
            function (a, b) {
                return this.optional(b) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(a);
            },
            "Please specify a valid mobile number"
        ),
        a.validator.addMethod(
            "mobileUK",
            function (a, b) {
                return (a = a.replace(/\(|\)|\s+|-/g, "")), this.optional(b) || (a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/));
            },
            "Please specify a valid mobile number"
        ),
        a.validator.addMethod(
            "nieES",
            function (a) {
                "use strict";
                var b,
                    c = new RegExp(/^[MXYZ]{1}[0-9]{7,8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/gi),
                    d = "TRWAGMYFPDXBNJZSQVHLCKET",
                    e = a.substr(a.length - 1).toUpperCase();
                return (
                    (a = a.toString().toUpperCase()),
                    !(a.length > 10 || a.length < 9 || !c.test(a)) && ((a = a.replace(/^[X]/, "0").replace(/^[Y]/, "1").replace(/^[Z]/, "2")), (b = 9 === a.length ? a.substr(0, 8) : a.substr(0, 9)), d.charAt(parseInt(b, 10) % 23) === e)
                );
            },
            "Please specify a valid NIE number."
        ),
        a.validator.addMethod(
            "nifES",
            function (a) {
                "use strict";
                return (
                    (a = a.toUpperCase()),
                    !!a.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") &&
                        (/^[0-9]{8}[A-Z]{1}$/.test(a) ? "TRWAGMYFPDXBNJZSQVHLCKE".charAt(a.substring(8, 0) % 23) === a.charAt(8) : !!/^[KLM]{1}/.test(a) && a[8] === String.fromCharCode(64))
                );
            },
            "Please specify a valid NIF number."
        ),
        a.validator.addMethod(
            "notEqualTo",
            function (b, c, d) {
                return this.optional(c) || !a.validator.methods.equalTo.call(this, b, c, d);
            },
            "Please enter a different value, values must not be the same."
        ),
        a.validator.addMethod(
            "nowhitespace",
            function (a, b) {
                return this.optional(b) || /^\S+$/i.test(a);
            },
            "No white space please"
        ),
        a.validator.addMethod(
            "pattern",
            function (a, b, c) {
                return !!this.optional(b) || ("string" == typeof c && (c = new RegExp("^(?:" + c + ")$")), c.test(a));
            },
            "Invalid format."
        ),
        a.validator.addMethod(
            "phoneNL",
            function (a, b) {
                return this.optional(b) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(a);
            },
            "Please specify a valid phone number."
        ),
        a.validator.addMethod(
            "phonesUK",
            function (a, b) {
                return (a = a.replace(/\(|\)|\s+|-/g, "")), this.optional(b) || (a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/));
            },
            "Please specify a valid uk phone number"
        ),
        a.validator.addMethod(
            "phoneUK",
            function (a, b) {
                return (
                    (a = a.replace(/\(|\)|\s+|-/g, "")),
                    this.optional(b) || (a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/))
                );
            },
            "Please specify a valid phone number"
        ),
        a.validator.addMethod(
            "phoneUS",
            function (a, b) {
                return (a = a.replace(/\s+/g, "")), this.optional(b) || (a.length > 9 && a.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/));
            },
            "Please specify a valid phone number"
        ),
        a.validator.addMethod(
            "postalcodeBR",
            function (a, b) {
                return this.optional(b) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(a);
            },
            "Informe um CEP válido."
        ),
        a.validator.addMethod(
            "postalCodeCA",
            function (a, b) {
                return this.optional(b) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( *|-?)\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(a);
            },
            "Please specify a valid postal code"
        ),
        a.validator.addMethod(
            "postalcodeIT",
            function (a, b) {
                return this.optional(b) || /^\d{5}$/.test(a);
            },
            "Please specify a valid postal code"
        ),
        a.validator.addMethod(
            "postalcodeNL",
            function (a, b) {
                return this.optional(b) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(a);
            },
            "Please specify a valid postal code"
        ),
        a.validator.addMethod(
            "postcodeUK",
            function (a, b) {
                return (
                    this.optional(b) ||
                    /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(
                        a
                    )
                );
            },
            "Please specify a valid UK postcode"
        ),
        a.validator.addMethod(
            "require_from_group",
            function (b, c, d) {
                var e = a(d[1], c.form),
                    f = e.eq(0),
                    g = f.data("valid_req_grp") ? f.data("valid_req_grp") : a.extend({}, this),
                    h =
                        e.filter(function () {
                            return g.elementValue(this);
                        }).length >= d[0];
                return (
                    f.data("valid_req_grp", g),
                    a(c).data("being_validated") ||
                        (e.data("being_validated", !0),
                        e.each(function () {
                            g.element(this);
                        }),
                        e.data("being_validated", !1)),
                    h
                );
            },
            a.validator.format("Please fill at least {0} of these fields.")
        ),
        a.validator.addMethod(
            "skip_or_fill_minimum",
            function (b, c, d) {
                var e = a(d[1], c.form),
                    f = e.eq(0),
                    g = f.data("valid_skip") ? f.data("valid_skip") : a.extend({}, this),
                    h = e.filter(function () {
                        return g.elementValue(this);
                    }).length,
                    i = 0 === h || h >= d[0];
                return (
                    f.data("valid_skip", g),
                    a(c).data("being_validated") ||
                        (e.data("being_validated", !0),
                        e.each(function () {
                            g.element(this);
                        }),
                        e.data("being_validated", !1)),
                    i
                );
            },
            a.validator.format("Please either skip these fields or fill at least {0} of them.")
        ),
        a.validator.addMethod(
            "stateUS",
            function (a, b, c) {
                var d,
                    e = "undefined" == typeof c,
                    f = !e && "undefined" != typeof c.caseSensitive && c.caseSensitive,
                    g = !e && "undefined" != typeof c.includeTerritories && c.includeTerritories,
                    h = !e && "undefined" != typeof c.includeMilitary && c.includeMilitary;
                return (
                    (d =
                        g || h
                            ? g && h
                                ? "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$"
                                : g
                                ? "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$"
                                : "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$"
                            : "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$"),
                    (d = f ? new RegExp(d) : new RegExp(d, "i")),
                    this.optional(b) || d.test(a)
                );
            },
            "Please specify a valid state"
        ),
        a.validator.addMethod(
            "strippedminlength",
            function (b, c, d) {
                return a(b).text().length >= d;
            },
            a.validator.format("Please enter at least {0} characters")
        ),
        a.validator.addMethod(
            "time",
            function (a, b) {
                return this.optional(b) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(a);
            },
            "Please enter a valid time, between 00:00 and 23:59"
        ),
        a.validator.addMethod(
            "time12h",
            function (a, b) {
                return this.optional(b) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(a);
            },
            "Please enter a valid time in 12-hour am/pm format"
        ),
        a.validator.addMethod(
            "url2",
            function (a, b) {
                return (
                    this.optional(b) ||
                    /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                        a
                    )
                );
            },
            a.validator.messages.url
        ),
        a.validator.addMethod(
            "vinUS",
            function (a) {
                if (17 !== a.length) return !1;
                var b,
                    c,
                    d,
                    e,
                    f,
                    g,
                    h = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                    i = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9],
                    j = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
                    k = 0;
                for (b = 0; b < 17; b++) {
                    if (((e = j[b]), (d = a.slice(b, b + 1)), 8 === b && (g = d), isNaN(d))) {
                        for (c = 0; c < h.length; c++)
                            if (d.toUpperCase() === h[c]) {
                                (d = i[c]), (d *= e), isNaN(g) && 8 === c && (g = h[c]);
                                break;
                            }
                    } else d *= e;
                    k += d;
                }
                return (f = k % 11), 10 === f && (f = "X"), f === g;
            },
            "The specified vehicle identification number (VIN) is invalid."
        ),
        a.validator.addMethod(
            "zipcodeUS",
            function (a, b) {
                return this.optional(b) || /^\d{5}(-\d{4})?$/.test(a);
            },
            "The specified US ZIP Code is invalid"
        ),
        a.validator.addMethod(
            "ziprange",
            function (a, b) {
                return this.optional(b) || /^90[2-5]\d\{2\}-\d{4}$/.test(a);
            },
            "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx"
        ),
        a
    );
});
