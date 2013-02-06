/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// a place for hacks

(function () {

    var hasProto = "__proto__" in Object.prototype;

    if (!hasProto) {
        Object.defineProperty(Object.prototype, '__proto__', {set : function(value){
            var tmpFunc = new Function();
            tmpFunc.prototype = Object.create(value);

            function copyProperties(a, b) {
                for (var i in b) {
                    var g = Object.getOwnPropertyDescriptor(b, i).get,
                        s = Object.getOwnPropertyDescriptor(b, i).set;

                    if (g || s) {
                        Object.defineProperty(a, i, Object.getOwnPropertyDescriptor(b, i));
                    } else {
                        a[i] = b[i];
                    }
                }
                return a;
            }

            copyProperties(tmpFunc.prototype, this);

            // hack to be able to redefine object prototype; we can't do it another way
            // because we have prototype as 'this' here only
            var props = Object.getOwnPropertyNames(window.WebInspector),
                prop;
            for (var i = props.length; i--;) {
                prop = props[i];
                if (typeof(window.WebInspector[prop]) === 'function' && window.WebInspector[prop].prototype === this) {
                    window.WebInspector[prop].prototype = new tmpFunc();
                    window.WebInspector[prop].prototype.proto = value;
                    break;
                }
            }

            this.constructor.prototype = new tmpFunc();

        }, get : function(){
            return this.proto;
        }});
    }

    this.extend = function (child, base) {
        child.prototype.__proto__ = base.prototype;
    }
})();

if (!HTMLElement.prototype.scrollIntoViewIfNeeded){
    HTMLElement.prototype.scrollIntoViewIfNeeded = HTMLElement.prototype.scrollIntoView;
}

if (!Selection.prototype.setBaseAndExtent){
    Selection.prototype.setBaseAndExtent = Selection.prototype.selectAllChildren;
}