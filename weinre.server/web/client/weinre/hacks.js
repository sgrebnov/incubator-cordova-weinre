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
    this.extend = function (child, base) {

        // webkit specific inheritance via __proto__
        if ("__proto__" in child.prototype) {
            child.prototype.__proto__ = base.prototype;
            return;
        }

        // if __proto__ does not exist do inheritance manually
        var tmpFunc = new Function();
        tmpFunc.prototype = Object.create(base.prototype);

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

        copyProperties(tmpFunc.prototype, child.prototype);

        child.prototype = new tmpFunc();
        child.prototype.constructor = child;
        child.prototype.__proto__ = base.prototype;


    }
})();

if (!HTMLElement.prototype.scrollIntoViewIfNeeded){
    HTMLElement.prototype.scrollIntoViewIfNeeded = HTMLElement.prototype.scrollIntoView;
}