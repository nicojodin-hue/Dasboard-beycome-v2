/* === Main for-sale JS === */
(function () {
    var form = document.getElementById('fs-search-form');
    if (!form) {
        return;
    }

    var body = document.body;
    var root = document.documentElement;
    var managedScrollLock = false;
    var loadingIndicator = document.getElementById('fs-loading-indicator');
    var loadingMessage = document.getElementById('fs-loading-message');
    var loadingVisible = false;

    function showLoadingIndicator(message) {
        if (!loadingIndicator || loadingVisible) {
            return;
        }
        if (loadingMessage && String(message || '').trim() !== '') {
            loadingMessage.textContent = String(message).trim();
        }
        loadingVisible = true;
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.setAttribute('aria-hidden', 'false');
    }

    function hideLoadingIndicator() {
        if (!loadingIndicator) {
            return;
        }
        loadingVisible = false;
        loadingIndicator.classList.add('hidden');
        loadingIndicator.setAttribute('aria-hidden', 'true');
    }

    function setScrollLock(enabled) {
        if (!body) {
            return;
        }

        if (enabled) {
            body.classList.add('fs-no-page-scroll');
            managedScrollLock = true;
            return;
        }

        if (managedScrollLock) {
            body.classList.remove('fs-no-page-scroll');
            managedScrollLock = false;
        }
    }

    function syncViewportLayoutVars() {
        var header = document.querySelector('body > header');
        var headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 0;
        root.style.setProperty('--fs-header-height', headerHeight + 'px');
        root.style.setProperty('--fs-viewport-height', window.innerHeight + 'px');
        setScrollLock(true);
    }

    function cleanupViewportLayoutVars() {
        window.removeEventListener('resize', syncViewportLayoutVars);
        window.removeEventListener('orientationchange', syncViewportLayoutVars);
        window.removeEventListener('pagehide', cleanupViewportLayoutVars);
        setScrollLock(false);
        root.style.removeProperty('--fs-header-height');
        root.style.removeProperty('--fs-viewport-height');
    }

    syncViewportLayoutVars();
    window.addEventListener('resize', syncViewportLayoutVars);
    window.addEventListener('orientationchange', syncViewportLayoutVars);
    window.addEventListener('pagehide', cleanupViewportLayoutVars);

    var currentResultsPage = 1;
    var currentResultsPageSize = 18;
    var resultsPageLoadToken = 0;
    var googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    var mapboxAccessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
    var searchBasePath = "\/for-sale";
    var saleUrl = "\/for-sale\/miami";
    var rentUrl = "\/for-rent\/miami";
    var closedUrl = "\/properties-closed\/miami";
    var isUserAuthenticated = false;
    var authenticatedUserId = null;
    var initialHiddenSessionCount = 0;

    var transactionToggle = document.getElementById('fs-transaction-toggle');
    var transactionSummaryText = document.getElementById('fs-transaction-summary-text');
    var transactionModal = document.getElementById('fs-transaction-modal');
    var transactionDialog = transactionModal ? transactionModal.querySelector('.fs-transaction-dialog') : null;
    var transactionApplyButton = transactionModal ? transactionModal.querySelector('[data-transaction-apply]') : null;
    var transactionChoiceButtons = transactionModal ? Array.prototype.slice.call(transactionModal.querySelectorAll('[data-transaction-value]')) : [];
    var transactionUrlMap = {
        sale: saleUrl,
        rent: rentUrl,
        closed: closedUrl
    };
    var transactionLabelMap = {
        sale: 'For sale',
        rent: 'For rent',
        closed: 'Sold'
    };
    var transactionListMap = {
        sale: 'for-sale',
        rent: 'for-rent',
        closed: 'properties-closed'
    };
    var transactionState = {
        value: "sale"    };
    var transactionDraftState = {
        value: transactionState.value
    };
    var transactionModalRestoreFocus = null;
    var transactionModalAnchor = null;
    var transactionModalShell = transactionModal ? transactionModal.parentElement : null;
    var priceToggle = document.getElementById('fs-price-toggle');
    var priceSummaryText = document.getElementById('fs-price-summary-text');
    var priceModal = document.getElementById('fs-price-modal');
    var priceDialog = priceModal ? priceModal.querySelector('.fs-price-dialog') : null;
    var priceApplyButton = priceModal ? priceModal.querySelector('[data-price-apply]') : null;
    var priceSliderMinInput = document.getElementById('fs-price-slider-min');
    var priceSliderMaxInput = document.getElementById('fs-price-slider-max');
    var priceSliderRange = document.getElementById('fs-price-slider-range');
    var priceMinLabel = document.getElementById('fs-price-min-label');
    var priceMaxLabel = document.getElementById('fs-price-max-label');
    var priceVisibleMinInput = document.getElementById('fs-price-visible-min');
    var priceVisibleMaxInput = document.getElementById('fs-price-visible-max');
    var priceModalRestoreFocus = null;
    var priceModalAnchor = null;
    var priceModalShell = priceModal ? priceModal.parentElement : null;
    var homeTypeToggle = document.getElementById('fs-home-type-toggle');
    var homeTypeSummaryText = document.getElementById('fs-home-type-summary-text');
    var homeTypeModal = document.getElementById('fs-home-type-modal');
    var homeTypeDialog = homeTypeModal ? homeTypeModal.querySelector('.fs-home-type-dialog') : null;
    var homeTypeApplyButton = homeTypeModal ? homeTypeModal.querySelector('[data-home-type-apply]') : null;
    var homeTypeChoiceButtons = homeTypeModal ? Array.prototype.slice.call(homeTypeModal.querySelectorAll('[data-home-type-value]')) : [];
    var homeTypeHiddenInput = document.getElementById('fs-home-type-hidden');
    var homeTypeChoices = [{"value":"","label":"Any","icon":"building"},{"value":"house","label":"House","icon":"house"},{"value":"condo","label":"Condo","icon":"building-2"},{"value":"townhome","label":"Townhome","icon":"house-heart"},{"value":"apartment","label":"Apartment","icon":"building"},{"value":"land","label":"Lot\/Land","icon":"trees"},{"value":"manufactured","label":"Mobile home","icon":"factory"}];
    var homeTypeState = {
        value: String((homeTypeHiddenInput && homeTypeHiddenInput.value) || '')
    };
    var homeTypeDraftState = {
        value: homeTypeState.value
    };
    var homeTypeModalRestoreFocus = null;
    var homeTypeModalAnchor = null;
    var homeTypeModalShell = homeTypeModal ? homeTypeModal.parentElement : null;
    var filtersToggle = document.getElementById('fs-filters-toggle');
    var filtersSummaryText = document.getElementById('fs-filters-summary-text');
    var filtersModal = document.getElementById('fs-filters-modal');
    var filtersDialog = filtersModal ? filtersModal.querySelector('.fs-filters-dialog') : null;
    var filtersApplyButton = filtersModal ? filtersModal.querySelector('[data-filters-apply]') : null;
    var filtersModalRestoreFocus = null;
    var filtersModalAnchor = null;
    var filtersModalShell = filtersModal ? filtersModal.parentElement : null;
    var sortInlineSelect = document.getElementById('fs-sort-inline-select');
    var sortAdvancedSelect = document.getElementById('fs-sort-advanced-select');
    var sortHiddenInput = document.getElementById('fs-sort-hidden');
    var sortByLegacyInput = document.getElementById('fs-sortby-legacy-hidden');
    var orderLegacyInput = document.getElementById('fs-order-legacy-hidden');
    var offsetHiddenInput = document.getElementById('fs-offset-hidden');
    var limitHiddenInput = document.getElementById('fs-limit-hidden');
    var matchHiddenInput = document.getElementById('fs-match-hidden');
    var centerHiddenInput = document.getElementById('fs-center-hidden');
    var viewportHiddenInput = document.getElementById('fs-viewport-hidden');
    var outlineHiddenInput = document.getElementById('fs-outline-hidden');
    var zoomHiddenInput = document.getElementById('fs-zoom-hidden');
    var filtersMinSqftInput = form.querySelector('input[name="fs"]');
    var filtersMaxSqftInput = form.querySelector('input[name="ts"]');
    var priceMinInput = document.getElementById('fs-price-min');
    var priceMaxInput = document.getElementById('fs-price-max');
    var priceMinLegacyInput = document.getElementById('fs-price-min-legacy');
    var priceMaxLegacyInput = document.getElementById('fs-price-max-legacy');
    var bedHiddenInput = document.getElementById('fs-bed-hidden');
    var bathHiddenInput = document.getElementById('fs-bath-hidden');
    var hBathHiddenInput = document.getElementById('fs-hbath-hidden');
    var bedBathToggle = document.getElementById('fs-bed-bath-toggle');
    var bedBathSummaryText = document.getElementById('fs-bed-bath-summary-text');
    var bedBathModal = document.getElementById('fs-bed-bath-modal');
    var bedBathDialog = bedBathModal ? bedBathModal.querySelector('.fs-bed-bath-dialog') : null;
    var bedBathApplyButton = bedBathModal ? bedBathModal.querySelector('[data-bed-bath-apply]') : null;
    var bedBathState = {
        bed: String((bedHiddenInput && bedHiddenInput.value) || ''),
        bath: String((bathHiddenInput && bathHiddenInput.value) || '')
    };
    var mobileFiltersDraftState = {
        transaction: transactionState.value,
        priceMin: String((priceMinInput && priceMinInput.value) || ''),
        priceMax: String((priceMaxInput && priceMaxInput.value) || ''),
        bed: bedBathState.bed,
        bath: bedBathState.bath,
        homeType: homeTypeState.value,
        sizeMin: String((filtersMinSqftInput && filtersMinSqftInput.value) || ''),
        sizeMax: String((filtersMaxSqftInput && filtersMaxSqftInput.value) || '')
    };
    var bedBathDraftState = {
        bed: bedBathState.bed,
        bath: bedBathState.bath
    };
    var bedBathModalRestoreFocus = null;
    var bedBathModalAnchor = null;
    var bedBathModalShell = bedBathModal ? bedBathModal.parentElement : null;
    var mobileFiltersToggle = document.getElementById('fs-mobile-filters-toggle');
    var mobileFiltersModal = document.getElementById('fs-mobile-filters-modal');
    var mobileFiltersDialog = mobileFiltersModal ? mobileFiltersModal.querySelector('.fs-mobile-filters-dialog') : null;
    var mobileFiltersApplyButton = mobileFiltersModal ? mobileFiltersModal.querySelector('[data-mobile-filters-apply]') : null;
    var mobileFiltersRestoreFocus = null;
    var mobileFiltersAnchor = null;
    var mobileFiltersShell = mobileFiltersModal ? mobileFiltersModal.parentElement : null;
    var mobileTransactionChoiceButtons = mobileFiltersModal ? Array.prototype.slice.call(mobileFiltersModal.querySelectorAll('[data-mobile-transaction-value]')) : [];
    var mobileBedChoiceButtons = mobileFiltersModal ? Array.prototype.slice.call(mobileFiltersModal.querySelectorAll('[data-mobile-bed-value]')) : [];
    var mobileBathChoiceButtons = mobileFiltersModal ? Array.prototype.slice.call(mobileFiltersModal.querySelectorAll('[data-mobile-bath-value]')) : [];
    var mobileHomeTypeChoiceButtons = mobileFiltersModal ? Array.prototype.slice.call(mobileFiltersModal.querySelectorAll('[data-mobile-home-type-value]')) : [];
    var mobilePriceMinInput = document.getElementById('fs-mobile-price-min');
    var mobilePriceMaxInput = document.getElementById('fs-mobile-price-max');
    var mobileSizeMinInput = document.getElementById('fs-mobile-size-min');
    var mobileSizeMaxInput = document.getElementById('fs-mobile-size-max');
    var transactionHiddenInput = form.querySelector('input[name="transaction"]');
    var transactionListHiddenInput = form.querySelector('input[name="transaction_list"]');
    var filtersSizeMinHiddenInput = document.getElementById('fs-size-min');
    var filtersSizeMaxHiddenInput = document.getElementById('fs-size-max');
    var nearInput = form.querySelector('input[name="near"]');
    var locationResultsList = document.getElementById('fs-location-results');
    var initialNearValue = nearInput ? String(nearInput.value || '').trim().toLowerCase() : '';
    var selectedLocationData = null;
    var locationRequestController = null;
    var searchInFlight = false;

    var LOCATION_CATEGORY_PRIORITY = [
        'cities',
        'places',
        'zipcodes',
        'neighborhoods',
        'counties',
        'communities',
        'schools',
        'references',
        'condos',
        'streets'
    ];

    function debounce(func, wait) {
        var timeout;
        return function () {
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(null, args);
            }, wait);
        };
    }

    function normalizeBuyNearQuery(rawValue, options) {
        var normalizedOptions = options || {};
        var preserveZipContext = normalizedOptions.preserveZipContext === true;
        var input = String(rawValue || '').trim();
        if (!input) {
            return '';
        }

        if (!input.includes(' ') && input.includes('-')) {
            input = input.replace(/-+/g, ' ');
        }

        input = input.replace(/\s+/g, ' ').trim();

        if (input.includes(',')) {
            var segments = input
                .split(',')
                .map(function (segment) {
                    return segment.trim();
                })
                .filter(Boolean);

            if (segments.length > 0) {
                var firstSegment = segments[0];
                var firstLooksLikeStreet = /^\d+\s+[a-z]/i.test(firstSegment);
                var firstLooksLikeZip = /^\d{5}(?:-\d{4})?$/.test(firstSegment);

                if (firstLooksLikeStreet && segments[1]) {
                    return segments[1];
                }

                if (firstLooksLikeZip) {
                    if (preserveZipContext) {
                        var zipContextSegments = segments.slice(0, Math.min(3, segments.length));
                        input = zipContextSegments.join(', ');
                    } else if (segments[1]) {
                        input = segments[1];
                    } else {
                        input = firstSegment;
                    }
                } else {
                    input = firstSegment;
                }
            }
        }

        input = input
            .replace(/\bunited\s+states\b/gi, '')
            .replace(/\busa\b/gi, '')
            .replace(/\bus\b/gi, '')
            .replace(/\s+/g, ' ')
            .trim();

        var parts = input.split(' ').filter(Boolean);
        var tail = parts.length > 0 ? parts[parts.length - 1].toUpperCase() : '';
        if (parts.length > 1 && /^[A-Z]{2}$/.test(tail) && !/^\d/.test(input)) {
            parts.pop();
            input = parts.join(' ').trim();
        }

        return input;
    }

    function slugifyBuyLocation(rawValue) {
        var normalized = String(rawValue || '')
            .trim()
            .replace(/,/g, ' ')
            .toLowerCase()
            .replace(/\bunited\s+states\b/g, '')
            .replace(/\busa\b/g, '')
            .replace(/\bus\b/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return normalized || 'search';
    }

    function extractZipCode(rawValue) {
        var input = String(rawValue || '').trim();
        if (!input) {
            return '';
        }

        var zipMatch = input.match(/\b\d{5}(?:-\d{4})?\b/);
        return zipMatch ? zipMatch[0] : '';
    }

    function pickBestLocationCandidate(query, payload) {
        var rawQuery = String(query || '').trim();
        var normalizedQuery = rawQuery.toLowerCase();
        if (!payload || typeof payload !== 'object') {
            return null;
        }

        var isZipQuery = /^\d{5}(?:-\d{4})?$/.test(rawQuery);
        var prioritizedCategories = isZipQuery
            ? ['zipcodes'].concat(LOCATION_CATEGORY_PRIORITY.filter(function (category) {
                return category !== 'zipcodes';
            }))
            : LOCATION_CATEGORY_PRIORITY;

        for (var index = 0; index < prioritizedCategories.length; index += 1) {
            var category = prioritizedCategories[index];
            var candidates = Array.isArray(payload[category]) ? payload[category] : [];
            if (!candidates.length) {
                continue;
            }

            var exact = candidates.find(function (item) {
                var value = String(item && item.v ? item.v : '').trim().toLowerCase();
                var key = String(item && item.k ? item.k : '').trim().toLowerCase();
                return value === normalizedQuery || key === normalizedQuery;
            });
            if (exact) {
                return Object.assign({}, exact, { tag: category });
            }

            var startsWith = candidates.find(function (item) {
                var value = String(item && item.v ? item.v : '').trim().toLowerCase();
                var key = String(item && item.k ? item.k : '').trim().toLowerCase();
                return value.startsWith(normalizedQuery) || key.startsWith(normalizedQuery);
            });
            if (startsWith) {
                return Object.assign({}, startsWith, { tag: category });
            }

            return Object.assign({}, candidates[0], { tag: category });
        }

        return null;
    }

    function fetchJsonWithTimeout(url, timeoutMs) {
        var maxTime = Number(timeoutMs || 1800);
        var controller = new AbortController();
        var timeoutId = setTimeout(function () {
            controller.abort();
        }, maxTime);

        return fetch(url, { signal: controller.signal })
            .then(function (response) {
                if (!response.ok) {
                    return null;
                }
                return response.json();
            })
            .catch(function (_error) {
                return null;
            })
            .finally(function () {
                clearTimeout(timeoutId);
            });
    }

    function extractCityFromAddress(addressValue) {
        var raw = String(addressValue || '').trim();
        if (!raw.includes(',')) {
            return '';
        }

        var segments = raw
            .split(',')
            .map(function (segment) {
                return segment.trim();
            })
            .filter(Boolean);

        if (segments.length < 2) {
            return '';
        }

        return normalizeBuyNearQuery(segments[1]);
    }

    function resolveBuyIntent(query) {
        return fetchJsonWithTimeout(
            'https://api.beycome.com/v1/locations?v=2&q=' + encodeURIComponent(query),
            1800
        ).then(function (locationJson) {
            var locationCandidate = pickBestLocationCandidate(query, locationJson && locationJson.data ? locationJson.data : null);
            if (locationCandidate) {
                return locationCandidate;
            }

            return fetchJsonWithTimeout(
                'https://api.beycome.com/v1/address?v=2&q=' + encodeURIComponent(query),
                1800
            ).then(function (addressJson) {
                var firstAddress = Array.isArray(addressJson && addressJson.data) ? addressJson.data[0] : null;
                var cityFromAddress = extractCityFromAddress(firstAddress && firstAddress.address ? firstAddress.address : '');
                if (!cityFromAddress) {
                    return null;
                }

                return {
                    value: cityFromAddress,
                    tag: 'cities',
                    position: null,
                    bounds: null
                };
            });
        });
    }

    function clearLocationResults() {
        if (!locationResultsList) {
            return;
        }
        locationResultsList.innerHTML = '';
        locationResultsList.classList.add('hidden');
    }

    function getOrderedLocationCategories(data) {
        var keys = Object.keys(data || {}).filter(function (key) {
            return Array.isArray(data[key]) && data[key].length > 0;
        });

        return keys.sort(function (a, b) {
            var aIndex = LOCATION_CATEGORY_PRIORITY.indexOf(a);
            var bIndex = LOCATION_CATEGORY_PRIORITY.indexOf(b);
            var aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
            var bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
            return aRank - bRank;
        });
    }

    function buildLocationSearchUrl(data, originalQuery) {
        var querySource = String(originalQuery || '').trim();

        if (data && (data.tag === 'streets' || data.position === 'street')) {
            var streetPath = String(data.bounds || data.key || '').replace(/^\/+/, '');
            if (streetPath !== '') {
                return '/' + streetPath;
            }
        }

        var selectedValue = data ? String(data.value || data.v || '').trim() : '';
        var isZipSelection = !!(data && data.tag === 'zipcodes');
        var zipValue = isZipSelection
            ? (extractZipCode(selectedValue) || extractZipCode(querySource))
            : '';
        var near = isZipSelection
            ? (normalizeBuyNearQuery(selectedValue || querySource, { preserveZipContext: true }) || selectedValue || querySource || zipValue)
            : (normalizeBuyNearQuery(selectedValue || querySource) || normalizeBuyNearQuery(querySource) || querySource);
        var matchValue = selectedValue || querySource || near;
        var slug = slugifyBuyLocation(near);
        var url = new URL(window.location.origin + searchBasePath + '/' + encodeURIComponent(slug));

        var params = new URLSearchParams(new FormData(form));
        [
            'near',
            'match',
            'center',
            'viewport',
            'outline',
            'zoom',
            'page',
            'offset'
        ].forEach(function (key) {
            params.delete(key);
        });

        params.set('near', near);
        params.set('match', matchValue);
        params.set('offset', '0');
        params.set('limit', String(Number(params.get('limit') || 18) > 0 ? Number(params.get('limit')) : 18));

        if (!zipValue && isZipSelection) {
            zipValue = extractZipCode(near);
        }
        if (zipValue) {
            params.set('zipcode', zipValue);
            params.set('zip', zipValue);
        } else {
            params.delete('zipcode');
            params.delete('zip');
        }

        var position = data ? (data.position || data.c || '') : '';
        var bounds = data ? (data.bounds || data.b || '') : '';
        if (position) {
            params.set('center', String(position));
        }
        if (bounds) {
            params.set('viewport', String(bounds));
        }

        url.search = params.toString();
        return url.pathname + (url.search ? ('?' + url.searchParams.toString()) : '');
    }

    function runLocationSearch(data, originalQuery) {
        var target = buildLocationSearchUrl(data, originalQuery);
        if (target) {
            window.location.assign(target);
        }
    }

    function syncLegacySortInputs(value) {
        if (!sortByLegacyInput || !orderLegacyInput) {
            return;
        }

        if (value === 'oldest') {
            sortByLegacyInput.value = 'ListingDate';
            orderLegacyInput.value = 'asc';
            return;
        }

        if (value === 'price_asc') {
            sortByLegacyInput.value = 'ListPrice';
            orderLegacyInput.value = 'asc';
            return;
        }

        if (value === 'price_desc') {
            sortByLegacyInput.value = 'ListPrice';
            orderLegacyInput.value = 'desc';
            return;
        }

        sortByLegacyInput.value = '';
        orderLegacyInput.value = 'asc';
    }

    function resetOffsetToFirstPage() {
        if (offsetHiddenInput) {
            offsetHiddenInput.value = '0';
        }
    }

    function syncSizeHiddenInputs() {
        if (filtersSizeMinHiddenInput && filtersMinSqftInput) {
            filtersSizeMinHiddenInput.value = sanitizeIntegerText(filtersMinSqftInput.value);
            filtersMinSqftInput.value = filtersSizeMinHiddenInput.value;
        }
        if (filtersSizeMaxHiddenInput && filtersMaxSqftInput) {
            filtersSizeMaxHiddenInput.value = sanitizeIntegerText(filtersMaxSqftInput.value);
            filtersMaxSqftInput.value = filtersSizeMaxHiddenInput.value;
        }
    }

    function buildResultsUrlFromForm(pathOverride) {
        var basePath = pathOverride || (form.getAttribute('action') || window.location.pathname);
        var url = new URL(basePath, window.location.origin);
        var params = new URLSearchParams(new FormData(form));
        if (filtersSizeMinHiddenInput) {
            params.delete('fs');
            if (filtersSizeMinHiddenInput.value !== '') {
                params.set('fs', filtersSizeMinHiddenInput.value);
            }
        }
        if (filtersSizeMaxHiddenInput) {
            params.delete('ts');
            if (filtersSizeMaxHiddenInput.value !== '') {
                params.set('ts', filtersSizeMaxHiddenInput.value);
            }
        }
        params.delete('page');
        params.set('offset', '0');
        params.set('limit', String(Number(params.get('limit') || 18) > 0 ? Number(params.get('limit')) : 18));
        url.search = params.toString();
        return url;
    }

    function submitResultsInBackground(message, pathOverride) {
        syncSizeHiddenInputs();
        syncSearchHiddenInputs(nearInput ? String(nearInput.value || '').trim() : '');
        var targetUrl = buildResultsUrlFromForm(pathOverride);
        loadResultsPageInBackground(targetUrl, '', 1, {
            fallbackToLocation: false,
            message: message || 'Loading listings...',
            updateMap: true
        });
    }

    function sanitizeIntegerText(value) {
        var raw = String(value == null ? '' : value).trim().replace(/,/g, '');
        if (raw === '') {
            return '';
        }

        return raw.replace(/[^\d]/g, '');
    }

    function sanitizeDecimalText(value) {
        var raw = String(value == null ? '' : value).trim().replace(/,/g, '');
        if (raw === '') {
            return '';
        }

        var cleaned = raw.replace(/[^\d.]/g, '');
        if (cleaned === '') {
            return '';
        }

        var parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts.shift() + '.' + parts.join('');
        }

        if (cleaned === '.' || cleaned === '..') {
            return '';
        }

        return cleaned;
    }

    function formatCompactPrice(value) {
        var numericValue = Number(value);
        if (!isFinite(numericValue) || numericValue < 0) {
            return 'Any';
        }

        if (numericValue === 0) {
            return '$0';
        }

        if (numericValue >= 1000000) {
            var millions = numericValue / 1000000;
            return '$' + (Math.round(millions * 10) / 10).toFixed(millions % 1 === 0 ? 0 : 1) + 'M';
        }

        if (numericValue >= 1000) {
            return '$' + Math.round(numericValue / 1000) + 'k';
        }

        return '$' + Math.round(numericValue).toLocaleString('en-US');
    }

    function normalizePriceInputValue(value, sliderMin, sliderMax) {
        var sanitized = sanitizeIntegerText(value);
        if (sanitized === '') {
            return '';
        }

        var numeric = Number(sanitized);
        if (!isFinite(numeric)) {
            return '';
        }

        return String(Math.max(sliderMin, Math.min(sliderMax, Math.round(numeric))));
    }

    function updatePriceSummaryText(hiddenMin, hiddenMax, sliderMin, sliderMax) {
        if (!priceSummaryText) {
            return;
        }

        var minLabel = hiddenMin === '' ? 'Any' : formatCompactPrice(hiddenMin);
        var maxLabel = hiddenMax === '' ? 'Any' : formatCompactPrice(hiddenMax);
        if (Number(hiddenMin) <= sliderMin) {
            minLabel = 'Any';
        }
        if (Number(hiddenMax) >= sliderMax) {
            maxLabel = 'Any';
        }

        priceSummaryText.textContent = minLabel + ' to ' + maxLabel;
    }

    function syncPriceVisibleInputs(hiddenMin, hiddenMax) {
        if (priceVisibleMinInput) {
            priceVisibleMinInput.value = hiddenMin === '' ? '' : Number(hiddenMin).toLocaleString('en-US');
        }
        if (priceVisibleMaxInput) {
            priceVisibleMaxInput.value = hiddenMax === '' ? '' : Number(hiddenMax).toLocaleString('en-US');
        }
    }

    function updatePriceSliderRange() {
        if (!priceToggle || !priceSliderMinInput || !priceSliderMaxInput || !priceSliderRange) {
            return;
        }

        var sliderMin = Number(priceToggle.dataset.defaultMin || 0);
        var sliderMax = Number(priceToggle.dataset.defaultMax || 10000000);
        var minValue = Number(priceSliderMinInput.value || sliderMin || 0);
        var maxValue = Number(priceSliderMaxInput.value || sliderMax || 0);
        var span = Math.max(sliderMax - sliderMin, 1);

        if (minValue > maxValue) {
            var source = priceSliderMinInput.dataset.activeSource || 'min';
            if (source === 'max') {
                minValue = maxValue;
                priceSliderMinInput.value = String(minValue);
            } else {
                maxValue = minValue;
                priceSliderMaxInput.value = String(maxValue);
            }
        }

        var startPercent = ((minValue - sliderMin) / span) * 100;
        var endPercent = ((maxValue - sliderMin) / span) * 100;
        priceSliderRange.style.left = Math.max(0, Math.min(startPercent, 100)) + '%';
        priceSliderRange.style.width = Math.max(0, Math.min(endPercent, 100) - Math.max(0, Math.min(startPercent, 100))) + '%';

        var hiddenMin = minValue <= sliderMin ? '' : String(minValue);
        var hiddenMax = maxValue >= sliderMax ? '' : String(maxValue);
        if (priceMinLabel && priceMaxLabel) {
            priceMinLabel.textContent = hiddenMin === '' ? '$0' : ('$' + Number(hiddenMin).toLocaleString('en-US'));
            priceMaxLabel.textContent = hiddenMax === '' ? '$10K+' : ('$' + Number(hiddenMax).toLocaleString('en-US'));
        }

        if (priceMinInput) {
            priceMinInput.value = hiddenMin;
        }
        if (priceMaxInput) {
            priceMaxInput.value = hiddenMax;
        }
        if (priceMinLegacyInput) {
            priceMinLegacyInput.value = hiddenMin;
        }
        if (priceMaxLegacyInput) {
            priceMaxLegacyInput.value = hiddenMax;
        }

        syncPriceVisibleInputs(hiddenMin, hiddenMax);
        updatePriceSummaryText(hiddenMin, hiddenMax, sliderMin, sliderMax);
    }

    function getHomeTypeLabel(value) {
        var normalized = String(value || '').trim();
        for (var index = 0; index < homeTypeChoices.length; index += 1) {
            var choice = homeTypeChoices[index];
            if (String(choice && choice.value !== undefined ? choice.value : '') === normalized) {
                return String(choice && choice.label !== undefined ? choice.label : 'Any');
            }
        }

        return 'Any';
    }

    function updateHomeTypeSummary() {
        if (homeTypeSummaryText) {
            homeTypeSummaryText.textContent = getHomeTypeLabel(homeTypeState.value);
        }
    }

    function updateFiltersSummary() {
        if (!filtersSummaryText) {
            return;
        }

        var selectedCount = 0;
        var minSqftValue = String((filtersMinSqftInput && filtersMinSqftInput.value) || '').trim();
        var maxSqftValue = String((filtersMaxSqftInput && filtersMaxSqftInput.value) || '').trim();
        var sortValue = String((sortAdvancedSelect && sortAdvancedSelect.value) || '').trim();

        if (minSqftValue !== '') {
            selectedCount += 1;
        }
        if (maxSqftValue !== '') {
            selectedCount += 1;
        }
        if (sortValue !== '') {
            selectedCount += 1;
        }

        filtersSummaryText.textContent = selectedCount === 0
            ? 'Any'
            : (selectedCount + ' selected');
    }

    function setHomeTypeChoiceActive(value) {
        if (!homeTypeModal) {
            return;
        }

        Array.prototype.slice.call(homeTypeChoiceButtons).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute('data-home-type-value') || '') === String(value || ''));
        });
    }

    function syncHomeTypeModalState() {
        setHomeTypeChoiceActive(homeTypeDraftState.value);
    }

    function positionHomeTypeModal(triggerButton) {
        if (!homeTypeDialog || !homeTypeModalShell) {
            return;
        }

        positionAnchoredFlyover(homeTypeDialog, homeTypeModalShell, triggerButton || homeTypeModalAnchor || homeTypeToggle, 2.1, 420, 520);
    }

    function positionFiltersModal(triggerButton) {
        if (!filtersDialog || !filtersModalShell) {
            return;
        }

        positionAnchoredFlyover(filtersDialog, filtersModalShell, triggerButton || filtersModalAnchor || filtersToggle, 1.25, 210, 280);
    }

    function closeHomeTypeModal(restoreFocus) {
        if (!homeTypeModal || homeTypeModal.classList.contains('hidden')) {
            return;
        }

        homeTypeModal.classList.add('hidden');
        homeTypeModal.setAttribute('aria-hidden', 'true');
        if (homeTypeToggle) {
            homeTypeToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && homeTypeModalRestoreFocus && typeof homeTypeModalRestoreFocus.focus === 'function') {
            focusWithoutScroll(homeTypeModalRestoreFocus);
        }
        homeTypeModalRestoreFocus = null;
        homeTypeModalAnchor = null;
        if (homeTypeDialog) {
            homeTypeDialog.style.left = '';
            homeTypeDialog.style.width = '';
        }
    }

    function closeFiltersModal(restoreFocus) {
        if (!filtersModal || filtersModal.classList.contains('hidden')) {
            return;
        }

        filtersModal.classList.add('hidden');
        filtersModal.setAttribute('aria-hidden', 'true');
        if (filtersToggle) {
            filtersToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && filtersModalRestoreFocus && typeof filtersModalRestoreFocus.focus === 'function') {
            focusWithoutScroll(filtersModalRestoreFocus);
        }
        filtersModalRestoreFocus = null;
        filtersModalAnchor = null;
        if (filtersDialog) {
            filtersDialog.style.left = '';
            filtersDialog.style.width = '';
        }
    }

    function openHomeTypeModal(triggerButton) {
        if (!homeTypeModal) {
            return;
        }

        if (filtersModal && !filtersModal.classList.contains('hidden')) {
            closeFiltersModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden')) {
            closePriceModal(false);
        }
        if (bedBathModal && !bedBathModal.classList.contains('hidden')) {
            closeBedBathModal(false);
        }
        if (transactionModal && !transactionModal.classList.contains('hidden')) {
            closeTransactionModal(false);
        }

        homeTypeModalRestoreFocus = triggerButton || document.activeElement;
        homeTypeModalAnchor = triggerButton || homeTypeToggle || null;
        homeTypeDraftState.value = homeTypeState.value;
        syncHomeTypeModalState();
        homeTypeModal.classList.remove('hidden');
        homeTypeModal.setAttribute('aria-hidden', 'false');
        if (homeTypeToggle) {
            homeTypeToggle.setAttribute('aria-expanded', 'true');
        }

        positionHomeTypeModal(homeTypeToggle || triggerButton || null);

        var firstSelected = homeTypeModal.querySelector('.fs-home-type-choice.is-active');
        focusWithoutScroll(firstSelected || homeTypeApplyButton || homeTypeToggle);
    }

    function openFiltersModal(triggerButton) {
        if (!filtersModal) {
            return;
        }

        if (homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            closeHomeTypeModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden')) {
            closePriceModal(false);
        }
        if (bedBathModal && !bedBathModal.classList.contains('hidden')) {
            closeBedBathModal(false);
        }
        if (transactionModal && !transactionModal.classList.contains('hidden')) {
            closeTransactionModal(false);
        }

        filtersModalRestoreFocus = triggerButton || document.activeElement;
        filtersModalAnchor = triggerButton || filtersToggle || null;
        updateFiltersSummary();
        filtersModal.classList.remove('hidden');
        filtersModal.setAttribute('aria-hidden', 'false');
        if (filtersToggle) {
            filtersToggle.setAttribute('aria-expanded', 'true');
        }

        positionFiltersModal(filtersToggle || triggerButton || null);

        focusWithoutScroll(filtersMinSqftInput || filtersToggle);
    }

    function toggleFiltersModal(triggerButton) {
        if (!filtersModal) {
            return;
        }

        if (filtersModal.classList.contains('hidden')) {
            openFiltersModal(triggerButton || filtersToggle || null);
            return;
        }

        closeFiltersModal(true);
    }

    function setMobileTransactionChoiceActive(value) {
        if (!mobileFiltersModal) {
            return;
        }

        Array.prototype.slice.call(mobileTransactionChoiceButtons).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute('data-mobile-transaction-value') || '') === String(value || ''));
        });
    }

    function setMobileBedBathChoiceActive(kind, value) {
        if (!mobileFiltersModal) {
            return;
        }

        var attributeName = kind === 'bath' ? 'data-mobile-bath-value' : 'data-mobile-bed-value';
        var buttons = kind === 'bath' ? mobileBathChoiceButtons : mobileBedChoiceButtons;

        Array.prototype.slice.call(buttons).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute(attributeName) || '') === String(value || ''));
        });
    }

    function setMobileHomeTypeChoiceActive(value) {
        if (!mobileFiltersModal) {
            return;
        }

        Array.prototype.slice.call(mobileHomeTypeChoiceButtons).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute('data-mobile-home-type-value') || '') === String(value || ''));
        });
    }

    function syncMobilePriceInputsFromDraft() {
        if (!mobilePriceMinInput || !mobilePriceMaxInput || !priceToggle || !priceSliderMinInput || !priceSliderMaxInput) {
            return;
        }

        var sliderMin = Number(priceToggle.dataset.defaultMin || 0);
        var sliderMax = Number(priceToggle.dataset.defaultMax || 10000000);
        var minValue = normalizePriceInputValue(mobilePriceMinInput.value, sliderMin, sliderMax);
        var maxValue = normalizePriceInputValue(mobilePriceMaxInput.value, sliderMin, sliderMax);

        mobileFiltersDraftState.priceMin = minValue;
        mobileFiltersDraftState.priceMax = maxValue;

        mobilePriceMinInput.value = minValue === '' ? '' : Number(minValue).toLocaleString('en-US');
        mobilePriceMaxInput.value = maxValue === '' ? '' : Number(maxValue).toLocaleString('en-US');
    }

    function syncMobileSizeInputsFromDraft() {
        if (!mobileSizeMinInput || !mobileSizeMaxInput) {
            return;
        }

        var minValue = sanitizeIntegerText(mobileSizeMinInput.value);
        var maxValue = sanitizeIntegerText(mobileSizeMaxInput.value);

        mobileFiltersDraftState.sizeMin = minValue;
        mobileFiltersDraftState.sizeMax = maxValue;

        mobileSizeMinInput.value = minValue;
        mobileSizeMaxInput.value = maxValue;
    }

    function syncMobileFiltersModalState() {
        mobileFiltersDraftState.transaction = transactionState.value;
        mobileFiltersDraftState.priceMin = String((priceMinInput && priceMinInput.value) || '');
        mobileFiltersDraftState.priceMax = String((priceMaxInput && priceMaxInput.value) || '');
        mobileFiltersDraftState.bed = bedBathState.bed;
        mobileFiltersDraftState.bath = bedBathState.bath;
        mobileFiltersDraftState.homeType = homeTypeState.value;
        mobileFiltersDraftState.sizeMin = String((filtersMinSqftInput && filtersMinSqftInput.value) || '');
        mobileFiltersDraftState.sizeMax = String((filtersMaxSqftInput && filtersMaxSqftInput.value) || '');

        setMobileTransactionChoiceActive(mobileFiltersDraftState.transaction);
        setMobileBedBathChoiceActive('bed', mobileFiltersDraftState.bed);
        setMobileBedBathChoiceActive('bath', mobileFiltersDraftState.bath);
        setMobileHomeTypeChoiceActive(mobileFiltersDraftState.homeType);

        if (mobilePriceMinInput) {
            mobilePriceMinInput.value = mobileFiltersDraftState.priceMin === ''
                ? ''
                : Number(mobileFiltersDraftState.priceMin).toLocaleString('en-US');
        }
        if (mobilePriceMaxInput) {
            mobilePriceMaxInput.value = mobileFiltersDraftState.priceMax === ''
                ? ''
                : Number(mobileFiltersDraftState.priceMax).toLocaleString('en-US');
        }
        if (mobileSizeMinInput) {
            mobileSizeMinInput.value = mobileFiltersDraftState.sizeMin;
        }
        if (mobileSizeMaxInput) {
            mobileSizeMaxInput.value = mobileFiltersDraftState.sizeMax;
        }
    }

    function positionMobileFiltersModal(triggerButton) {
        if (!mobileFiltersDialog || !mobileFiltersShell) {
            return;
        }

        positionAnchoredFlyover(mobileFiltersDialog, mobileFiltersShell, triggerButton || mobileFiltersAnchor || mobileFiltersToggle, 3.7, 360, 720);
    }

    function closeMobileFiltersModal(restoreFocus) {
        if (!mobileFiltersModal || mobileFiltersModal.classList.contains('hidden')) {
            return;
        }

        mobileFiltersModal.classList.add('hidden');
        mobileFiltersModal.setAttribute('aria-hidden', 'true');
        if (mobileFiltersToggle) {
            mobileFiltersToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && mobileFiltersRestoreFocus && typeof mobileFiltersRestoreFocus.focus === 'function') {
            focusWithoutScroll(mobileFiltersRestoreFocus);
        }
        mobileFiltersRestoreFocus = null;
        mobileFiltersAnchor = null;
        if (mobileFiltersDialog) {
            mobileFiltersDialog.style.left = '';
            mobileFiltersDialog.style.width = '';
        }
    }

    function openMobileFiltersModal(triggerButton) {
        if (!mobileFiltersModal) {
            return;
        }

        if (transactionModal && !transactionModal.classList.contains('hidden')) {
            closeTransactionModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden')) {
            closePriceModal(false);
        }
        if (bedBathModal && !bedBathModal.classList.contains('hidden')) {
            closeBedBathModal(false);
        }
        if (homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            closeHomeTypeModal(false);
        }
        if (filtersModal && !filtersModal.classList.contains('hidden')) {
            closeFiltersModal(false);
        }

        mobileFiltersRestoreFocus = triggerButton || document.activeElement;
        mobileFiltersAnchor = triggerButton || mobileFiltersToggle || null;
        syncMobileFiltersModalState();
        mobileFiltersModal.classList.remove('hidden');
        mobileFiltersModal.setAttribute('aria-hidden', 'false');
        if (mobileFiltersToggle) {
            mobileFiltersToggle.setAttribute('aria-expanded', 'true');
        }

        positionMobileFiltersModal(mobileFiltersToggle || triggerButton || null);
        focusWithoutScroll(mobilePriceMinInput || mobileTransactionChoiceButtons[0] || mobileFiltersApplyButton || mobileFiltersToggle);
    }

    function toggleMobileFiltersModal(triggerButton) {
        if (!mobileFiltersModal) {
            return;
        }

        if (mobileFiltersModal.classList.contains('hidden')) {
            openMobileFiltersModal(triggerButton || mobileFiltersToggle || null);
            return;
        }

        closeMobileFiltersModal(true);
    }

    function handleMobileFiltersChoiceClick(event) {
        var transactionButton = event.target ? event.target.closest('[data-mobile-transaction-value]') : null;
        if (transactionButton) {
            mobileFiltersDraftState.transaction = String(transactionButton.getAttribute('data-mobile-transaction-value') || '');
            setMobileTransactionChoiceActive(mobileFiltersDraftState.transaction);
            return;
        }

        var bedButton = event.target ? event.target.closest('[data-mobile-bed-value]') : null;
        if (bedButton) {
            mobileFiltersDraftState.bed = String(bedButton.getAttribute('data-mobile-bed-value') || '');
            setMobileBedBathChoiceActive('bed', mobileFiltersDraftState.bed);
            return;
        }

        var bathButton = event.target ? event.target.closest('[data-mobile-bath-value]') : null;
        if (bathButton) {
            mobileFiltersDraftState.bath = String(bathButton.getAttribute('data-mobile-bath-value') || '');
            setMobileBedBathChoiceActive('bath', mobileFiltersDraftState.bath);
            return;
        }

        var homeTypeButton = event.target ? event.target.closest('[data-mobile-home-type-value]') : null;
        if (homeTypeButton) {
            mobileFiltersDraftState.homeType = String(homeTypeButton.getAttribute('data-mobile-home-type-value') || '');
            setMobileHomeTypeChoiceActive(mobileFiltersDraftState.homeType);
        }
    }

    function applyMobileFiltersSelection(shouldSubmit) {
        syncMobilePriceInputsFromDraft();
        syncMobileSizeInputsFromDraft();

        transactionDraftState.value = String(mobileFiltersDraftState.transaction || '');
        transactionState.value = transactionDraftState.value;
        if (transactionHiddenInput) {
            transactionHiddenInput.value = transactionState.value;
        }
        if (transactionListHiddenInput) {
            transactionListHiddenInput.value = transactionListMap[transactionState.value] || transactionListMap.sale;
        }
        updateTransactionSummary();

        if (priceSliderMinInput && priceSliderMaxInput) {
            var sliderMin = Number(priceToggle ? priceToggle.dataset.defaultMin || 0 : 0);
            var sliderMax = Number(priceToggle ? priceToggle.dataset.defaultMax || 10000000 : 10000000);
            priceSliderMinInput.value = mobileFiltersDraftState.priceMin === '' ? String(sliderMin) : String(mobileFiltersDraftState.priceMin);
            priceSliderMaxInput.value = mobileFiltersDraftState.priceMax === '' ? String(sliderMax) : String(mobileFiltersDraftState.priceMax);
            updatePriceSliderRange();
        }

        bedBathDraftState.bed = String(mobileFiltersDraftState.bed || '');
        bedBathDraftState.bath = String(mobileFiltersDraftState.bath || '');
        applyBedBathSelection(false);

        homeTypeDraftState.value = String(mobileFiltersDraftState.homeType || '');
        applyHomeTypeSelection(false);

        if (filtersMinSqftInput) {
            filtersMinSqftInput.value = mobileFiltersDraftState.sizeMin;
        }
        if (filtersMaxSqftInput) {
            filtersMaxSqftInput.value = mobileFiltersDraftState.sizeMax;
        }
        if (filtersSizeMinHiddenInput) {
            filtersSizeMinHiddenInput.value = mobileFiltersDraftState.sizeMin;
        }
        if (filtersSizeMaxHiddenInput) {
            filtersSizeMaxHiddenInput.value = mobileFiltersDraftState.sizeMax;
        }
        updateFiltersSummary();

        if (shouldSubmit) {
            var nextTransactionUrl = transactionUrlMap[transactionState.value] || transactionUrlMap.sale;
            if (nextTransactionUrl) {
                form.action = nextTransactionUrl;
            }
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...', nextTransactionUrl);
        }
    }

    function toggleHomeTypeModal(triggerButton) {
        if (!homeTypeModal) {
            return;
        }

        if (homeTypeModal.classList.contains('hidden')) {
            openHomeTypeModal(triggerButton || homeTypeToggle || null);
            return;
        }

        closeHomeTypeModal(true);
    }

    function applyHomeTypeSelection(shouldSubmit) {
        homeTypeState.value = String(homeTypeDraftState.value || '');

        if (homeTypeHiddenInput) {
            homeTypeHiddenInput.value = homeTypeState.value;
        }

        updateHomeTypeSummary();

        if (shouldSubmit) {
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...');
        }
    }

    function handleHomeTypeChoiceClick(event) {
        var button = event.target ? event.target.closest('[data-home-type-value]') : null;
        if (!button) {
            return;
        }

        var value = String(button.getAttribute('data-home-type-value') || '');
        homeTypeDraftState.value = value;
        setHomeTypeChoiceActive(value);
    }

    function syncPriceSlider(source, shouldSubmit) {
        if (!priceToggle || !priceSliderMinInput || !priceSliderMaxInput) {
            return;
        }

        if (priceSliderMinInput) {
            priceSliderMinInput.style.zIndex = source === 'max' ? '2' : '3';
        }
        if (priceSliderMaxInput) {
            priceSliderMaxInput.style.zIndex = source === 'max' ? '3' : '2';
        }

        priceSliderMinInput.dataset.activeSource = source === 'max' ? 'max' : 'min';
        updatePriceSliderRange();

        if (shouldSubmit) {
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...');
        }
    }

    function positionPriceModal(triggerButton) {
        if (!priceDialog || !priceModalShell) {
            return;
        }

        positionAnchoredFlyover(priceDialog, priceModalShell, triggerButton || priceModalAnchor || priceToggle, 1.65, 430, 500);
    }

    function closePriceModal(restoreFocus) {
        if (!priceModal || priceModal.classList.contains('hidden')) {
            return;
        }

        priceModal.classList.add('hidden');
        priceModal.setAttribute('aria-hidden', 'true');
        if (priceToggle) {
            priceToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && priceModalRestoreFocus && typeof priceModalRestoreFocus.focus === 'function') {
            focusWithoutScroll(priceModalRestoreFocus);
        }
        priceModalRestoreFocus = null;
        priceModalAnchor = null;
        if (priceDialog) {
            priceDialog.style.left = '';
            priceDialog.style.width = '';
        }
    }

    function openPriceModal(triggerButton) {
        if (!priceModal) {
            return;
        }

        if (filtersModal && !filtersModal.classList.contains('hidden')) {
            closeFiltersModal(false);
        }
        if (homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            closeHomeTypeModal(false);
        }
        if (transactionModal && !transactionModal.classList.contains('hidden')) {
            closeTransactionModal(false);
        }
        if (bedBathModal && !bedBathModal.classList.contains('hidden')) {
            closeBedBathModal(false);
        }

        priceModalRestoreFocus = triggerButton || document.activeElement;
        priceModalAnchor = triggerButton || priceToggle || null;
        updatePriceSliderRange();
        priceModal.classList.remove('hidden');
        priceModal.setAttribute('aria-hidden', 'false');
        if (priceToggle) {
            priceToggle.setAttribute('aria-expanded', 'true');
        }

        positionPriceModal(priceToggle || triggerButton || null);

        focusWithoutScroll(priceVisibleMinInput || priceApplyButton || priceToggle);
    }

    function togglePriceModal(triggerButton) {
        if (!priceModal) {
            return;
        }

        if (priceModal.classList.contains('hidden')) {
            openPriceModal(triggerButton || priceToggle || null);
            return;
        }

        closePriceModal(true);
    }

    function applyPriceSelection(shouldSubmit) {
        updatePriceSliderRange();

        if (shouldSubmit) {
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...');
        }
    }

    function handlePriceVisibleInputChange(source) {
        if (!priceToggle || !priceSliderMinInput || !priceSliderMaxInput) {
            return;
        }

        var sliderMin = Number(priceToggle.dataset.defaultMin || 0);
        var sliderMax = Number(priceToggle.dataset.defaultMax || 10000000);
        var minValue = normalizePriceInputValue(priceVisibleMinInput ? priceVisibleMinInput.value : '', sliderMin, sliderMax);
        var maxValue = normalizePriceInputValue(priceVisibleMaxInput ? priceVisibleMaxInput.value : '', sliderMin, sliderMax);

        priceSliderMinInput.dataset.activeSource = source === 'max' ? 'max' : 'min';
        priceSliderMinInput.value = minValue === '' ? String(sliderMin) : minValue;
        priceSliderMaxInput.value = maxValue === '' ? String(sliderMax) : maxValue;
        syncPriceSlider(source, false);
    }

    if (priceSliderMinInput && priceSliderMaxInput) {
        updatePriceSliderRange();
    }

    function normalizeBedBathValue(rawValue) {
        return String(rawValue == null ? '' : rawValue).trim();
    }

    function getBedBathSummaryText() {
        var bedValue = normalizeBedBathValue(bedBathState.bed);
        var bathValue = normalizeBedBathValue(bedBathState.bath);

        if (!bedValue && !bathValue) {
            return 'Any';
        }

        return (bedValue || 'Any') + ' / ' + (bathValue || 'Any');
    }

    function updateBedBathSummary() {
        if (bedBathSummaryText) {
            bedBathSummaryText.textContent = getBedBathSummaryText();
        }
    }

    function positionAnchoredFlyover(dialog, shellElement, triggerButton, widthMultiplier, minWidth, maxWidthCap) {
        if (!dialog || !triggerButton || typeof triggerButton.getBoundingClientRect !== 'function') {
            return;
        }

        var anchorRect = triggerButton.getBoundingClientRect();
        var shellRect = shellElement && typeof shellElement.getBoundingClientRect === 'function'
            ? shellElement.getBoundingClientRect()
            : null;
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
        var desiredWidth = Math.max(minWidth || 320, Math.round(anchorRect.width * (widthMultiplier || 2)));
        var maxWidth = Math.max(320, viewportWidth - 24);
        var panelWidth = Math.min(desiredWidth, maxWidth, maxWidthCap || desiredWidth);
        var left = Math.round(anchorRect.left - (shellRect ? shellRect.left : 0));

        if (shellRect) {
            var shellRight = shellRect.width;
            if (left + panelWidth > shellRight - 12) {
                left = shellRight - panelWidth - 12;
            }
        }
        if (left < 12) {
            left = 12;
        }

        dialog.style.width = panelWidth + 'px';
        dialog.style.left = left + 'px';
    }

    function positionBedBathModal(triggerButton) {
        if (!bedBathDialog || !bedBathModalShell) {
            return;
        }

        positionAnchoredFlyover(bedBathDialog, bedBathModalShell, triggerButton || bedBathModalAnchor || bedBathToggle, 2.2, 440, 560);
    }

    function positionTransactionModal(triggerButton) {
        if (!transactionDialog || !transactionModalShell) {
            return;
        }

        positionAnchoredFlyover(transactionDialog, transactionModalShell, triggerButton || transactionModalAnchor || transactionToggle, 1.6, 300, 340);
    }

    function setBedBathChoiceActive(kind, value) {
        if (!bedBathModal) {
            return;
        }

        Array.prototype.slice.call(
            bedBathModal.querySelectorAll('[data-bed-bath-kind="' + kind + '"] [data-bed-bath-value]')
        ).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute('data-bed-bath-value') || '') === String(value || ''));
        });
    }

    function syncBedBathModalState() {
        setBedBathChoiceActive('bed', bedBathDraftState.bed);
        setBedBathChoiceActive('bath', bedBathDraftState.bath);
    }

    function applyBedBathSelection(shouldSubmit) {
        bedBathState.bed = normalizeBedBathValue(bedBathDraftState.bed);
        bedBathState.bath = normalizeBedBathValue(bedBathDraftState.bath);

        if (bedHiddenInput) {
            bedHiddenInput.value = bedBathState.bed;
        }
        if (bathHiddenInput) {
            bathHiddenInput.value = bedBathState.bath;
        }
        if (hBathHiddenInput) {
            hBathHiddenInput.value = bedBathState.bath;
        }

        updateBedBathSummary();

        if (shouldSubmit) {
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...');
        }
    }

    function closeBedBathModal(restoreFocus) {
        if (!bedBathModal || bedBathModal.classList.contains('hidden')) {
            return;
        }

        bedBathModal.classList.add('hidden');
        bedBathModal.setAttribute('aria-hidden', 'true');
        if (bedBathToggle) {
            bedBathToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && bedBathModalRestoreFocus && typeof bedBathModalRestoreFocus.focus === 'function') {
            focusWithoutScroll(bedBathModalRestoreFocus);
        }
        bedBathModalRestoreFocus = null;
        bedBathModalAnchor = null;
        if (bedBathDialog) {
            bedBathDialog.style.left = '';
            bedBathDialog.style.width = '';
        }
    }

    function openBedBathModal(triggerButton) {
        if (!bedBathModal) {
            return;
        }

        if (filtersModal && !filtersModal.classList.contains('hidden')) {
            closeFiltersModal(false);
        }
        if (homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            closeHomeTypeModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden')) {
            closePriceModal(false);
        }
        if (transactionModal && !transactionModal.classList.contains('hidden')) {
            closeTransactionModal(false);
        }

        bedBathModalRestoreFocus = triggerButton || document.activeElement;
        bedBathModalAnchor = triggerButton || bedBathToggle || null;
        bedBathDraftState.bed = bedBathState.bed;
        bedBathDraftState.bath = bedBathState.bath;
        syncBedBathModalState();
        bedBathModal.classList.remove('hidden');
        bedBathModal.setAttribute('aria-hidden', 'false');
        if (bedBathToggle) {
            bedBathToggle.setAttribute('aria-expanded', 'true');
        }

        positionBedBathModal(bedBathToggle || triggerButton || null);

        var firstSelected = bedBathModal.querySelector('.fs-bed-bath-choice.is-active');
        focusWithoutScroll(firstSelected || bedBathApplyButton || bedBathToggle);
    }

    function toggleBedBathModal(triggerButton) {
        if (!bedBathModal) {
            return;
        }

        if (bedBathModal.classList.contains('hidden')) {
            openBedBathModal(triggerButton || bedBathToggle || null);
            return;
        }

        closeBedBathModal(true);
    }

    function handleBedBathChoiceClick(event) {
        var button = event.target ? event.target.closest('[data-bed-bath-value]') : null;
        if (!button) {
            return;
        }

        var group = button.closest('[data-bed-bath-kind]');
        if (!group) {
            return;
        }

        var kind = group.getAttribute('data-bed-bath-kind');
        var value = String(button.getAttribute('data-bed-bath-value') || '');
        bedBathDraftState[kind] = value;
        setBedBathChoiceActive(kind, value);
    }

    function getTransactionLabel(value) {
        var normalized = String(value || '').trim();
        return transactionLabelMap[normalized] || transactionLabelMap.sale;
    }

    function updateTransactionSummary() {
        if (transactionSummaryText) {
            transactionSummaryText.textContent = getTransactionLabel(transactionState.value);
        }
    }

    function setTransactionChoiceActive(value) {
        if (!transactionModal) {
            return;
        }

        Array.prototype.slice.call(transactionChoiceButtons).forEach(function (button) {
            button.classList.toggle('is-active', String(button.getAttribute('data-transaction-value') || '') === String(value || ''));
        });
    }

    function syncTransactionModalState() {
        setTransactionChoiceActive(transactionDraftState.value);
    }

    function closeTransactionModal(restoreFocus) {
        if (!transactionModal || transactionModal.classList.contains('hidden')) {
            return;
        }

        transactionModal.classList.add('hidden');
        transactionModal.setAttribute('aria-hidden', 'true');
        if (transactionToggle) {
            transactionToggle.setAttribute('aria-expanded', 'false');
        }

        if (restoreFocus && transactionModalRestoreFocus && typeof transactionModalRestoreFocus.focus === 'function') {
            focusWithoutScroll(transactionModalRestoreFocus);
        }
        transactionModalRestoreFocus = null;
        transactionModalAnchor = null;
        if (transactionDialog) {
            transactionDialog.style.left = '';
            transactionDialog.style.width = '';
        }
    }

    function openTransactionModal(triggerButton) {
        if (!transactionModal) {
            return;
        }

        if (filtersModal && !filtersModal.classList.contains('hidden')) {
            closeFiltersModal(false);
        }
        if (homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            closeHomeTypeModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden')) {
            closePriceModal(false);
        }
        if (bedBathModal && !bedBathModal.classList.contains('hidden')) {
            closeBedBathModal(false);
        }

        transactionModalRestoreFocus = triggerButton || document.activeElement;
        transactionModalAnchor = triggerButton || transactionToggle || null;
        transactionDraftState.value = transactionState.value;
        syncTransactionModalState();
        transactionModal.classList.remove('hidden');
        transactionModal.setAttribute('aria-hidden', 'false');
        if (transactionToggle) {
            transactionToggle.setAttribute('aria-expanded', 'true');
        }

        positionTransactionModal(transactionToggle || triggerButton || null);

        var firstSelected = transactionModal.querySelector('.fs-transaction-choice.is-active');
        focusWithoutScroll(firstSelected || transactionApplyButton || transactionToggle);
    }

    function toggleTransactionModal(triggerButton) {
        if (!transactionModal) {
            return;
        }

        if (transactionModal.classList.contains('hidden')) {
            openTransactionModal(triggerButton || transactionToggle || null);
            return;
        }

        closeTransactionModal(true);
    }

    function applyTransactionSelection(shouldSubmit) {
        transactionState.value = String(transactionDraftState.value || 'sale');
        if (transactionHiddenInput) {
            transactionHiddenInput.value = transactionState.value;
        }
        if (transactionListHiddenInput) {
            transactionListHiddenInput.value = transactionListMap[transactionState.value] || transactionListMap.sale;
        }
        updateTransactionSummary();

        if (shouldSubmit) {
            var nextUrl = transactionUrlMap[transactionState.value] || transactionUrlMap.sale;
            if (nextUrl) {
                searchBasePath = nextUrl;
                resetOffsetToFirstPage();
                submitResultsInBackground('Filtering listings...', nextUrl);
            }
        }
    }

    function handleTransactionChoiceClick(event) {
        var button = event.target ? event.target.closest('[data-transaction-value]') : null;
        if (!button) {
            return;
        }

        var value = String(button.getAttribute('data-transaction-value') || '');
        transactionDraftState.value = value;
        setTransactionChoiceActive(value);
    }

    updateHomeTypeSummary();
    updateBedBathSummary();
    updateTransactionSummary();
    updateFiltersSummary();

    if (priceSliderMinInput && priceSliderMaxInput) {
        priceSliderMinInput.addEventListener('input', function () {
            syncPriceSlider('min', false);
        });
        priceSliderMaxInput.addEventListener('input', function () {
            syncPriceSlider('max', false);
        });
        priceSliderMinInput.addEventListener('change', function () {
            syncPriceSlider('min', false);
        });
        priceSliderMaxInput.addEventListener('change', function () {
            syncPriceSlider('max', false);
        });
    }

    if (priceVisibleMinInput) {
        priceVisibleMinInput.addEventListener('input', function () {
            handlePriceVisibleInputChange('min');
        });
        priceVisibleMinInput.addEventListener('change', function () {
            handlePriceVisibleInputChange('min');
        });
    }

    if (priceVisibleMaxInput) {
        priceVisibleMaxInput.addEventListener('input', function () {
            handlePriceVisibleInputChange('max');
        });
        priceVisibleMaxInput.addEventListener('change', function () {
            handlePriceVisibleInputChange('max');
        });
    }

    if (bedBathToggle) {
        bedBathToggle.addEventListener('click', function () {
            toggleBedBathModal(bedBathToggle);
        });
    }

    if (homeTypeToggle) {
        homeTypeToggle.addEventListener('click', function () {
            toggleHomeTypeModal(homeTypeToggle);
        });
    }

    if (priceToggle) {
        priceToggle.addEventListener('click', function () {
            togglePriceModal(priceToggle);
        });
    }

    if (transactionToggle) {
        transactionToggle.addEventListener('click', function () {
            toggleTransactionModal(transactionToggle);
        });
    }

    if (filtersToggle) {
        filtersToggle.addEventListener('click', function () {
            toggleFiltersModal(filtersToggle);
        });
    }

    if (mobileFiltersToggle) {
        mobileFiltersToggle.addEventListener('click', function () {
            toggleMobileFiltersModal(mobileFiltersToggle);
        });
    }

    if (priceModal) {
        priceModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-price-dialog') : null;
            if (!clickedDialog) {
                closePriceModal(false);
                return;
            }
        });
    }

    if (homeTypeModal) {
        homeTypeModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-home-type-dialog') : null;
            if (!clickedDialog) {
                closeHomeTypeModal(false);
                return;
            }
        });

        homeTypeModal.addEventListener('click', handleHomeTypeChoiceClick);
    }

    if (bedBathModal) {
        bedBathModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-bed-bath-dialog') : null;
            if (!clickedDialog) {
                closeBedBathModal(false);
                return;
            }
        });

        bedBathModal.addEventListener('click', handleBedBathChoiceClick);
    }

    if (transactionModal) {
        transactionModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-transaction-dialog') : null;
            if (!clickedDialog) {
                closeTransactionModal(false);
                return;
            }
        });

        transactionModal.addEventListener('click', handleTransactionChoiceClick);
    }

    if (filtersModal) {
        filtersModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-filters-dialog') : null;
            if (!clickedDialog) {
                closeFiltersModal(false);
            }
        });

        filtersModal.addEventListener('input', updateFiltersSummary);
        filtersModal.addEventListener('change', updateFiltersSummary);
    }

    if (mobileFiltersModal) {
        mobileFiltersModal.addEventListener('click', function (event) {
            var clickedDialog = event.target && event.target.closest ? event.target.closest('.fs-mobile-filters-dialog') : null;
            if (!clickedDialog) {
                closeMobileFiltersModal(false);
                return;
            }
        });

        mobileFiltersModal.addEventListener('click', handleMobileFiltersChoiceClick);
    }

    if (bedBathApplyButton) {
        bedBathApplyButton.addEventListener('click', function () {
            closeBedBathModal(false);
            applyBedBathSelection(true);
        });
    }

    if (homeTypeApplyButton) {
        homeTypeApplyButton.addEventListener('click', function () {
            closeHomeTypeModal(false);
            applyHomeTypeSelection(true);
        });
    }

    if (priceApplyButton) {
        priceApplyButton.addEventListener('click', function () {
            closePriceModal(false);
            applyPriceSelection(true);
        });
    }

    if (filtersApplyButton) {
        filtersApplyButton.addEventListener('click', function () {
            syncSizeHiddenInputs();
            updateFiltersSummary();
            closeFiltersModal(false);
            resetOffsetToFirstPage();
            submitResultsInBackground('Filtering listings...');
        });
    }

    if (transactionApplyButton) {
        transactionApplyButton.addEventListener('click', function () {
            applyTransactionSelection(true);
            closeTransactionModal(false);
        });
    }

    if (filtersMinSqftInput) {
        filtersMinSqftInput.addEventListener('input', updateFiltersSummary);
        filtersMinSqftInput.addEventListener('change', updateFiltersSummary);
    }

    if (filtersMaxSqftInput) {
        filtersMaxSqftInput.addEventListener('input', updateFiltersSummary);
        filtersMaxSqftInput.addEventListener('change', updateFiltersSummary);
    }

    if (mobilePriceMinInput) {
        mobilePriceMinInput.addEventListener('input', syncMobilePriceInputsFromDraft);
        mobilePriceMinInput.addEventListener('change', syncMobilePriceInputsFromDraft);
    }

    if (mobilePriceMaxInput) {
        mobilePriceMaxInput.addEventListener('input', syncMobilePriceInputsFromDraft);
        mobilePriceMaxInput.addEventListener('change', syncMobilePriceInputsFromDraft);
    }

    if (mobileSizeMinInput) {
        mobileSizeMinInput.addEventListener('input', syncMobileSizeInputsFromDraft);
        mobileSizeMinInput.addEventListener('change', syncMobileSizeInputsFromDraft);
    }

    if (mobileSizeMaxInput) {
        mobileSizeMaxInput.addEventListener('input', syncMobileSizeInputsFromDraft);
        mobileSizeMaxInput.addEventListener('change', syncMobileSizeInputsFromDraft);
    }

    if (mobileFiltersApplyButton) {
        mobileFiltersApplyButton.addEventListener('click', function () {
            closeMobileFiltersModal(false);
            applyMobileFiltersSelection(true);
        });
    }

    if (sortAdvancedSelect) {
        sortAdvancedSelect.addEventListener('change', function () {
            updateFiltersSummary();
        });
    }

    if (bedBathModal && bedBathDialog) {
        window.addEventListener('resize', function () {
            if (!bedBathModal.classList.contains('hidden')) {
                positionBedBathModal(bedBathModalAnchor || bedBathToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!bedBathModal.classList.contains('hidden')) {
                positionBedBathModal(bedBathModalAnchor || bedBathToggle || null);
            }
        }, true);
    }

    if (homeTypeModal && homeTypeDialog) {
        window.addEventListener('resize', function () {
            if (!homeTypeModal.classList.contains('hidden')) {
                positionHomeTypeModal(homeTypeModalAnchor || homeTypeToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!homeTypeModal.classList.contains('hidden')) {
                positionHomeTypeModal(homeTypeModalAnchor || homeTypeToggle || null);
            }
        }, true);
    }

    if (priceModal && priceDialog) {
        window.addEventListener('resize', function () {
            if (!priceModal.classList.contains('hidden')) {
                positionPriceModal(priceModalAnchor || priceToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!priceModal.classList.contains('hidden')) {
                positionPriceModal(priceModalAnchor || priceToggle || null);
            }
        }, true);
    }

    if (transactionModal && transactionDialog) {
        window.addEventListener('resize', function () {
            if (!transactionModal.classList.contains('hidden')) {
                positionTransactionModal(transactionModalAnchor || transactionToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!transactionModal.classList.contains('hidden')) {
                positionTransactionModal(transactionModalAnchor || transactionToggle || null);
            }
        }, true);
    }

    if (filtersModal && filtersDialog) {
        window.addEventListener('resize', function () {
            if (!filtersModal.classList.contains('hidden')) {
                positionFiltersModal(filtersModalAnchor || filtersToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!filtersModal.classList.contains('hidden')) {
                positionFiltersModal(filtersModalAnchor || filtersToggle || null);
            }
        }, true);
    }

    if (mobileFiltersModal && mobileFiltersDialog) {
        window.addEventListener('resize', function () {
            if (!mobileFiltersModal.classList.contains('hidden')) {
                positionMobileFiltersModal(mobileFiltersAnchor || mobileFiltersToggle || null);
            }
        });

        window.addEventListener('scroll', function () {
            if (!mobileFiltersModal.classList.contains('hidden')) {
                positionMobileFiltersModal(mobileFiltersAnchor || mobileFiltersToggle || null);
            }
        }, true);
    }

    document.addEventListener('click', function (event) {
        var target = event.target;
        var clickedHomeTypeDialog = target && target.closest ? target.closest('.fs-home-type-dialog') : null;
        var clickedHomeTypeToggle = target && target.closest ? target.closest('#fs-home-type-toggle') : null;
        var clickedPriceDialog = target && target.closest ? target.closest('.fs-price-dialog') : null;
        var clickedPriceToggle = target && target.closest ? target.closest('#fs-price-toggle') : null;
        var clickedBedBathDialog = target && target.closest ? target.closest('.fs-bed-bath-dialog') : null;
        var clickedBedBathToggle = target && target.closest ? target.closest('#fs-bed-bath-toggle') : null;
        var clickedTransactionDialog = target && target.closest ? target.closest('.fs-transaction-dialog') : null;
        var clickedTransactionToggle = target && target.closest ? target.closest('#fs-transaction-toggle') : null;
        var clickedFiltersDialog = target && target.closest ? target.closest('.fs-filters-dialog') : null;
        var clickedFiltersToggle = target && target.closest ? target.closest('#fs-filters-toggle') : null;
        var clickedMobileFiltersDialog = target && target.closest ? target.closest('.fs-mobile-filters-dialog') : null;
        var clickedMobileFiltersToggle = target && target.closest ? target.closest('#fs-mobile-filters-toggle') : null;

        if (homeTypeModal && !homeTypeModal.classList.contains('hidden') && !clickedHomeTypeDialog && !clickedHomeTypeToggle) {
            closeHomeTypeModal(false);
        }
        if (priceModal && !priceModal.classList.contains('hidden') && !clickedPriceDialog && !clickedPriceToggle) {
            closePriceModal(false);
        }

        if (bedBathModal && !bedBathModal.classList.contains('hidden') && !clickedBedBathDialog && !clickedBedBathToggle) {
            closeBedBathModal(false);
        }

        if (transactionModal && !transactionModal.classList.contains('hidden') && !clickedTransactionDialog && !clickedTransactionToggle) {
            closeTransactionModal(false);
        }
        if (filtersModal && !filtersModal.classList.contains('hidden') && !clickedFiltersDialog && !clickedFiltersToggle) {
            closeFiltersModal(false);
        }
        if (mobileFiltersModal && !mobileFiltersModal.classList.contains('hidden') && !clickedMobileFiltersDialog && !clickedMobileFiltersToggle) {
            closeMobileFiltersModal(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && homeTypeModal && !homeTypeModal.classList.contains('hidden')) {
            event.preventDefault();
            closeHomeTypeModal(true);
            return;
        }
        if (event.key === 'Escape' && priceModal && !priceModal.classList.contains('hidden')) {
            event.preventDefault();
            closePriceModal(true);
            return;
        }

        if (event.key === 'Escape' && transactionModal && !transactionModal.classList.contains('hidden')) {
            event.preventDefault();
            closeTransactionModal(true);
            return;
        }
        if (event.key === 'Escape' && bedBathModal && !bedBathModal.classList.contains('hidden')) {
            event.preventDefault();
            closeBedBathModal(true);
            return;
        }
        if (event.key === 'Escape' && filtersModal && !filtersModal.classList.contains('hidden')) {
            event.preventDefault();
            closeFiltersModal(true);
            return;
        }
        if (event.key === 'Escape' && mobileFiltersModal && !mobileFiltersModal.classList.contains('hidden')) {
            event.preventDefault();
            closeMobileFiltersModal(true);
        }
    });

    if (sortInlineSelect) {
        sortInlineSelect.addEventListener('change', function () {
            if (sortHiddenInput) {
                sortHiddenInput.value = sortInlineSelect.value;
            }
            if (sortAdvancedSelect) {
                sortAdvancedSelect.value = sortInlineSelect.value;
            }
            syncLegacySortInputs(sortInlineSelect.value);
            updateFiltersSummary();
            resetOffsetToFirstPage();
            submitResultsInBackground('Sorting listings...');
        });
    }

    if (sortAdvancedSelect) {
        sortAdvancedSelect.addEventListener('change', function () {
            if (sortHiddenInput) {
                sortHiddenInput.value = sortAdvancedSelect.value;
            }
            if (sortInlineSelect) {
                sortInlineSelect.value = sortAdvancedSelect.value;
            }
            syncLegacySortInputs(sortAdvancedSelect.value);
            updateFiltersSummary();
            resetOffsetToFirstPage();
            submitResultsInBackground('Sorting listings...');
        });
    }

    syncLegacySortInputs((sortHiddenInput && sortHiddenInput.value) || '');

    function syncSearchHiddenInputs(currentNearValue) {
        var normalizedCurrentNear = String(currentNearValue || '').toLowerCase();
        var nearChanged = normalizedCurrentNear !== initialNearValue;

        if (matchHiddenInput && nearInput) {
            if (currentNearValue !== '') {
                matchHiddenInput.value = currentNearValue;
            }
        }

        if (nearChanged) {
            if (offsetHiddenInput) {
                offsetHiddenInput.value = '0';
            }
            if (centerHiddenInput) {
                centerHiddenInput.value = '';
            }
            if (viewportHiddenInput) {
                viewportHiddenInput.value = '';
            }
            if (outlineHiddenInput) {
                outlineHiddenInput.value = '';
            }
            if (zoomHiddenInput) {
                zoomHiddenInput.value = '';
            }
        }

        if (limitHiddenInput && (!limitHiddenInput.value || Number(limitHiddenInput.value) <= 0)) {
            limitHiddenInput.value = '18';
        }
    }

    async function fetchLocationSuggestions(query) {
        if (!locationResultsList || !nearInput) {
            return;
        }

        var trimmedQuery = String(query || '').trim();
        if (trimmedQuery.length < 2) {
            clearLocationResults();
            return;
        }

        if (locationRequestController) {
            locationRequestController.abort();
        }

        var activeController = new AbortController();
        locationRequestController = activeController;

        try {
            var response = await fetch(
                'https://api.beycome.com/v1/locations?v=2&q=' + encodeURIComponent(trimmedQuery),
                { signal: activeController.signal }
            );
            if (!response.ok) {
                clearLocationResults();
                return;
            }

            var json = await response.json();
            var data = (json && json.data && typeof json.data === 'object') ? json.data : {};

            var categories = getOrderedLocationCategories(data);
            if (!categories.length) {
                clearLocationResults();
                return;
            }

            if (locationRequestController !== activeController) {
                return;
            }

            locationResultsList.innerHTML = '';

            categories.forEach(function (category) {
                var header = document.createElement('li');
                header.className = 'fs-location-category';
                header.textContent = category;
                locationResultsList.appendChild(header);

                var rows = data[category].slice(0, 10);
                rows.forEach(function (item) {
                    var option = {
                        key: item.k,
                        value: item.v,
                        tag: category,
                        position: item.c,
                        bounds: item.b
                    };

                    var row = document.createElement('li');
                    row.className = 'fs-location-option';
                    row.dataset.selectable = '1';
                    row.innerHTML = '<img src="../icons/lucide/map-pin.svg" alt="" width="14" height="14">';
                    var label = document.createElement('span');
                    label.textContent = String(option.value || '');
                    row.appendChild(label);
                    row.addEventListener('click', function () {
                        nearInput.value = option.value || '';
                        selectedLocationData = option;
                        clearLocationResults();
                        runLocationSearch(option, option.value || trimmedQuery);
                    });
                    locationResultsList.appendChild(row);
                });
            });

            locationResultsList.classList.remove('hidden');
        } catch (error) {
            if (error && error.name !== 'AbortError') {
                clearLocationResults();
            }
        } finally {
            if (locationRequestController === activeController) {
                locationRequestController = null;
            }
        }
    }

    form.addEventListener('submit', async function (event) {
        var currentNearValue = nearInput ? String(nearInput.value || '').trim() : '';
        syncSearchHiddenInputs(currentNearValue);

        if (currentNearValue === '') {
            return;
        }

        event.preventDefault();
        if (searchInFlight) {
            return;
        }

        searchInFlight = true;
        try {
            var resolved = selectedLocationData;
            if (!resolved) {
                resolved = await resolveBuyIntent(currentNearValue);
            }
            runLocationSearch(resolved, currentNearValue);
        } finally {
            searchInFlight = false;
        }
    });

    if (nearInput) {
        var debouncedSuggestionsFetch = debounce(fetchLocationSuggestions, 300);

        nearInput.addEventListener('input', function (event) {
            selectedLocationData = null;
            debouncedSuggestionsFetch(event.target.value);
        });

        nearInput.addEventListener('focus', function () {
            if (locationResultsList && locationResultsList.children.length > 0) {
                locationResultsList.classList.remove('hidden');
            }
        });

        nearInput.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                clearLocationResults();
                return;
            }

            if (event.key !== 'Enter' || !locationResultsList || locationResultsList.classList.contains('hidden')) {
                return;
            }

            var firstResult = locationResultsList.querySelector('[data-selectable="1"]');
            if (firstResult) {
                event.preventDefault();
                firstResult.click();
            }
        });
    }

    document.addEventListener('click', function (event) {
        if (locationResultsList && (!event.target || !event.target.closest('.fs-location-wrap'))) {
            clearLocationResults();
        }
        if (!event.target || !event.target.closest('.fs-card-menu-wrap')) {
            closeOpenFlyover();
        }
    });

    var COMPARE_LIMIT = 5;
    var COMPARE_STORAGE_KEY = 'compare_id';
    var compareIds = [];
    var compareHeadBtn = document.getElementById('fs-compare-head-btn');
    var compareHeadValue = document.getElementById('fs-compare-head-value');
    var compareModal = document.getElementById('fs-compare-modal');
    var compareModalBody = document.getElementById('fs-compare-modal-body');
    var compareModalCount = document.getElementById('fs-compare-modal-count');
    var compareModalCloseButton = compareModal ? compareModal.querySelector('[data-compare-close]') : null;
    var compareState = null;
    var compareFetchToken = 0;
    var unhideAllBtn = document.getElementById('fs-unhide-all-btn');
    var hiddenSessionCount = Number(initialHiddenSessionCount || 0);
    var restoringHiddenInFlight = false;
    var openFlyover = null;
    var openFlyoverTrigger = null;
    var feedbackModal = document.getElementById('fs-feedback-modal');
    var feedbackTitle = document.getElementById('fs-feedback-title');
    var feedbackMessage = document.getElementById('fs-feedback-message');
    var feedbackConfirm = feedbackModal ? feedbackModal.querySelector('[data-feedback-confirm]') : null;
    var feedbackCancel = feedbackModal ? feedbackModal.querySelector('[data-feedback-cancel]') : null;
    var feedbackState = null;
    var shareModal = document.getElementById('fs-share-modal');
    var shareCloseButton = shareModal ? shareModal.querySelector('[data-share-close]') : null;
    var shareCopyButton = shareModal ? shareModal.querySelector('[data-share-copy]') : null;
    var shareLinkInput = document.getElementById('fs-share-link-input');
    var shareState = null;
    var favoritesLookup = Object.create(null);
    var favoritesLookupRefreshInFlight = false;

    function updateVisibleCount() {
        var countNode = document.getElementById('fs-visible-count');
        if (countNode) {
            var totalCount = Number(countNode.getAttribute('data-total-count') || countNode.textContent || 0);
            countNode.textContent = new Intl.NumberFormat('en-US').format(Number.isFinite(totalCount) ? totalCount : 0);
        }
    }

    function updateUnhideAllButton() {
        if (!unhideAllBtn) {
            return;
        }

        var hiddenCardsInDom = Array.prototype.slice.call(document.querySelectorAll('.fs-card')).filter(function (card) {
            return card.style.display === 'none';
        }).length;
        var totalHidden = hiddenCardsInDom + Math.max(0, hiddenSessionCount);
        unhideAllBtn.classList.toggle('hidden', totalHidden <= 0);
        unhideAllBtn.textContent = totalHidden > 0 ? ('Unhide all (' + totalHidden + ')') : 'Unhide all';
    }

    function updateCompareHeadCount() {
        if (!compareHeadBtn) {
            return;
        }
        if (compareHeadValue) {
            compareHeadValue.textContent = compareIds.length > 0
                ? (compareIds.length + ' selected')
                : '0 selected';
        }
        compareHeadBtn.setAttribute('aria-expanded', compareState ? 'true' : 'false');
    }

    function normalizePropertyId(rawValue) {
        var value = String(rawValue || '').trim();
        if (value.toUpperCase().indexOf('BEYC') === 0) {
            value = value.slice(4).trim();
        }
        return value;
    }

    function formatFavoritePropertyId(rawValue) {
        var value = String(rawValue || '').trim();
        if (!value) {
            return '';
        }

        if (value.toUpperCase().indexOf('BEYC') === 0) {
            var prefixed = value.slice(4).trim();
            return prefixed ? ('BEYC' + prefixed) : '';
        }

        return /^\d+$/.test(value) ? ('BEYC' + value) : value;
    }

    function getCardPropertyId(card) {
        if (!card) {
            return '';
        }
        return normalizePropertyId(card.getAttribute('data-property-id') || '');
    }

    function getCardFavoritePropertyId(card) {
        if (!card) {
            return '';
        }
        return formatFavoritePropertyId(card.getAttribute('data-property-id') || '');
    }

    function setCardSaved(card, saved) {
        if (!card) {
            return;
        }

        var nextSaved = saved === true;
        card.setAttribute('data-saved', nextSaved ? '1' : '0');

        var saveButton = card.querySelector('[data-card-save-toggle]');
        if (saveButton) {
            saveButton.classList.toggle('is-saved', nextSaved);
            saveButton.setAttribute('aria-pressed', nextSaved ? 'true' : 'false');
            saveButton.setAttribute('aria-label', nextSaved ? 'Unsave listing' : 'Save listing');
        }
    }

    function updateFavoriteLookupForCard(propId, isSaved) {
        var favoriteId = formatFavoritePropertyId(propId);
        if (!favoriteId) {
            return;
        }

        if (isSaved) {
            favoritesLookup[favoriteId] = true;
            return;
        }

        delete favoritesLookup[favoriteId];
    }

    function seedFavoritesLookupFromDom() {
        favoritesLookup = Object.create(null);
        document.querySelectorAll('.fs-card').forEach(function (card) {
            var propId = getCardFavoritePropertyId(card);
            if (!propId) {
                return;
            }

            if (card.getAttribute('data-saved') === '1') {
                favoritesLookup[propId] = true;
            }
        });
    }

    function applyFavoritesLookupToCards() {
        document.querySelectorAll('.fs-card').forEach(function (card) {
            var propId = getCardFavoritePropertyId(card);
            if (!propId) {
                return;
            }

            setCardSaved(card, Boolean(favoritesLookup[propId]));
        });
    }

    async function refreshFavoritesLookupFromServer() {
        if (!isUserAuthenticated || favoritesLookupRefreshInFlight) {
            return;
        }

        favoritesLookupRefreshInFlight = true;
        try {
            var response = await fetch('/api/property/favorites-lookup', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            if (!response.ok) {
                return;
            }

            var payload = await response.json().catch(function () {
                return null;
            });
            var ids = Array.isArray(payload && payload.data && payload.data.favorite_ids)
                ? payload.data.favorite_ids
                : [];

            favoritesLookup = Object.create(null);
            ids.forEach(function (candidate) {
                var favoriteId = formatFavoritePropertyId(candidate);
                if (favoriteId) {
                    favoritesLookup[favoriteId] = true;
                }
            });

            applyFavoritesLookupToCards();
        } catch (_error) {
        } finally {
            favoritesLookupRefreshInFlight = false;
        }
    }

    function syncSavedCardsFromDom() {
        document.querySelectorAll('.fs-card').forEach(function (card) {
            setCardSaved(card, card.getAttribute('data-saved') === '1');
        });
    }

    function parseCompareIds(rawValue) {
        return String(rawValue || '')
            .split(',')
            .map(function (part) {
                return normalizePropertyId(part);
            })
            .filter(function (part, index, allParts) {
                return part !== '' && allParts.indexOf(part) === index;
            });
    }

    function loadCompareIdsFromStorage() {
        try {
            compareIds = parseCompareIds(window.localStorage.getItem(COMPARE_STORAGE_KEY));
        } catch (_error) {
            compareIds = [];
        }
    }

    function persistCompareIds() {
        try {
            window.localStorage.setItem(COMPARE_STORAGE_KEY, compareIds.join(','));
        } catch (_error) {}
    }

    function removeCompareId(propId) {
        compareIds = compareIds.filter(function (value) {
            return value !== propId;
        });
        persistCompareIds();
    }

    function setCardComparedState(card, compared) {
        if (!card) {
            return;
        }

        var nextCompared = compared === true;
        card.setAttribute('data-compared', nextCompared ? '1' : '0');
        card.classList.toggle('is-compared', nextCompared);

        var compareLabel = card.querySelector('[data-compare-label]');
        if (compareLabel) {
            compareLabel.textContent = nextCompared ? 'Compared' : 'Compare';
        }
    }

    function syncComparedCardsFromStorage() {
        document.querySelectorAll('.fs-card').forEach(function (card) {
            var propId = getCardPropertyId(card);
            setCardComparedState(card, propId !== '' && compareIds.indexOf(propId) !== -1);
        });
        updateCompareHeadCount();
    }

    function normalizeCompareValue(value) {
        var normalized = String(value || '').trim();
        return normalized !== '' ? normalized : '--';
    }

    function normalizeCompareType(value) {
        var normalized = String(value || '').trim();
        if (normalized.toLowerCase() === 'single family') {
            return 'House';
        }
        return normalized !== '' ? normalized : '--';
    }

    function formatCompareListedValue(dayValue) {
        var days = Number(dayValue);
        if (!Number.isFinite(days) || days < 0) {
            return '--';
        }
        if (days === 0) {
            return 'Today';
        }
        if (days === 1) {
            return '1 day ago';
        }
        return String(Math.round(days)) + ' days ago';
    }

    function normalizeComparePayload(item, fallbackId) {
        var row = item && typeof item === 'object' ? item : {};
        var resolvedId = normalizePropertyId(row.id || fallbackId || '');
        var address = normalizeCompareValue(row.address);
        var propertyCity = normalizeCompareValue(row.property_city);

        return {
            id: resolvedId,
            image: String(row.cloudinary_id || '').trim(),
            detailUrl: String(row.final_status || '#').trim() || '#',
            address: address,
            propertyCity: propertyCity,
            type: normalizeCompareType(row.type),
            listingPrice: normalizeCompareValue(row.listing_price),
            refund: normalizeCompareValue(row.refund),
            bedroom: normalizeCompareValue(row.bedroom),
            bathroom: normalizeCompareValue(row.bathroom),
            sqft: normalizeCompareValue(row.sqft),
            priceSqft: normalizeCompareValue(row.price_sqft),
            constructYear: normalizeCompareValue(row.construct_year),
            listed: formatCompareListedValue(row.created_on_day)
        };
    }

    async function fetchComparePayloads(ids) {
        if (!ids || !ids.length) {
            return [];
        }

        var raw = await postLegacyAction('getcomparestore', { prop_id: ids.join(',') });
        var parsed;
        try {
            parsed = JSON.parse(String(raw || '[]'));
        } catch (_parseError) {
            parsed = [];
        }

        var rows = Array.isArray(parsed)
            ? parsed
            : (parsed && typeof parsed === 'object' ? [parsed] : []);
        var payloadById = Object.create(null);
        rows.forEach(function (entry) {
            var normalized = normalizeComparePayload(entry);
            if (normalized.id) {
                payloadById[normalized.id] = normalized;
            }
        });

        return ids.map(function (id) {
            var normalizedId = normalizePropertyId(id);
            if (normalizedId && payloadById[normalizedId]) {
                return payloadById[normalizedId];
            }
            return normalizeComparePayload({}, normalizedId);
        });
    }

    function createInlineCompareCloseIcon() {
        var svgNs = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgNs, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');

        var line1 = document.createElementNS(svgNs, 'path');
        line1.setAttribute('d', 'M18 6 6 18');
        svg.appendChild(line1);

        var line2 = document.createElementNS(svgNs, 'path');
        line2.setAttribute('d', 'm6 6 12 12');
        svg.appendChild(line2);

        return svg;
    }

    function renderCompareModalTable(payloads) {
        if (!compareModalBody) {
            return;
        }

        compareModalBody.innerHTML = '';

        if (!payloads.length) {
            var empty = document.createElement('p');
            empty.className = 'fs-compare-empty';
            empty.textContent = 'Select listings to compare.';
            compareModalBody.appendChild(empty);
            return;
        }

        var wrapper = document.createElement('div');
        wrapper.className = 'fs-compare-table-wrap';

        var table = document.createElement('table');
        table.className = 'fs-compare-table';

        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');
        var spacerHeader = document.createElement('th');
        spacerHeader.className = 'fs-compare-row-label';
        spacerHeader.setAttribute('scope', 'col');
        spacerHeader.textContent = '';
        headRow.appendChild(spacerHeader);

        payloads.forEach(function (row) {
            var colHeader = document.createElement('th');
            colHeader.className = 'fs-compare-cell fs-compare-col-header';
            colHeader.setAttribute('scope', 'col');

            var removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'fs-compare-remove';
            removeButton.setAttribute('data-compare-remove', row.id);
            removeButton.setAttribute('aria-label', 'Remove listing from compare');
            removeButton.appendChild(createInlineCompareCloseIcon());
            colHeader.appendChild(removeButton);

            var addressLink = document.createElement('a');
            addressLink.className = 'fs-compare-address-link';
            addressLink.href = row.detailUrl || '#';
            addressLink.target = '_blank';
            addressLink.rel = 'noopener noreferrer';
            addressLink.textContent = row.address !== '--' ? row.address : row.propertyCity;
            colHeader.appendChild(addressLink);

            if (row.image !== '') {
                var imageLink = document.createElement('a');
                imageLink.className = 'fs-compare-image-link';
                imageLink.href = row.detailUrl || '#';
                imageLink.target = '_blank';
                imageLink.rel = 'noopener noreferrer';

                var image = document.createElement('img');
                image.className = 'fs-compare-image';
                image.src = row.image;
                image.alt = row.address !== '--' ? row.address : 'Listing image';
                image.loading = 'lazy';
                imageLink.appendChild(image);
                colHeader.appendChild(imageLink);
            } else {
                var placeholder = document.createElement('div');
                placeholder.className = 'fs-compare-image-placeholder';
                placeholder.textContent = 'No image';
                colHeader.appendChild(placeholder);
            }

            headRow.appendChild(colHeader);
        });

        thead.appendChild(headRow);
        table.appendChild(thead);

        var body = document.createElement('tbody');
        var rows = [
            { label: 'Type', key: 'type' },
            { label: 'Price', key: 'listingPrice' },
            { label: 'Refund', key: 'refund' },
            { label: 'Beds', key: 'bedroom' },
            { label: 'Baths', key: 'bathroom' },
            { label: 'Sqft', key: 'sqft' },
            { label: 'Price/Sqft', key: 'priceSqft' },
            { label: 'Year Built', key: 'constructYear' },
            { label: 'Listed', key: 'listed' }
        ];

        rows.forEach(function (definition) {
            var rowElement = document.createElement('tr');
            var rowHeader = document.createElement('th');
            rowHeader.className = 'fs-compare-row-label';
            rowHeader.setAttribute('scope', 'row');
            rowHeader.textContent = definition.label;
            rowElement.appendChild(rowHeader);

            payloads.forEach(function (payload) {
                var cell = document.createElement('td');
                cell.className = 'fs-compare-cell';
                cell.textContent = normalizeCompareValue(payload[definition.key]);
                rowElement.appendChild(cell);
            });

            body.appendChild(rowElement);
        });

        table.appendChild(body);
        wrapper.appendChild(table);
        compareModalBody.appendChild(wrapper);
    }

    function closeCompareModal(restoreFocus) {
        if (!compareModal || !compareState) {
            return;
        }

        var state = compareState;
        compareState = null;

        compareModal.classList.add('hidden');
        compareModal.setAttribute('aria-hidden', 'true');
        updateCompareHeadCount();

        if (restoreFocus && state.restoreFocus && typeof state.restoreFocus.focus === 'function') {
            focusWithoutScroll(state.restoreFocus);
        }
    }

    async function renderCompareModal() {
        if (!compareState || !compareModalBody) {
            return;
        }

        if (compareModalCount) {
            compareModalCount.textContent = '(' + compareIds.length + '/5)';
        }

        if (!compareIds.length) {
            renderCompareModalTable([]);
            return;
        }

        var requestToken = ++compareFetchToken;
        compareModalBody.innerHTML = '';
        var loading = document.createElement('p');
        loading.className = 'fs-compare-loading';
        loading.textContent = 'Loading compare data...';
        compareModalBody.appendChild(loading);

        try {
            var payloads = await fetchComparePayloads(compareIds.slice(0, COMPARE_LIMIT));
            if (!compareState || requestToken !== compareFetchToken) {
                return;
            }
            renderCompareModalTable(payloads);
        } catch (_error) {
            if (!compareState || requestToken !== compareFetchToken) {
                return;
            }
            compareModalBody.innerHTML = '';
            var failed = document.createElement('p');
            failed.className = 'fs-compare-empty';
            failed.textContent = 'Unable to load compare data right now.';
            compareModalBody.appendChild(failed);
        }
    }

    async function openCompareModal(triggerButton) {
        if (!compareModal) {
            return;
        }

        if (!compareIds.length) {
            await showFeedbackModal({
                title: 'Compare listings',
                message: 'Select at least one listing to compare.'
            });
            return;
        }

        var restoreFocus = triggerButton;
        if (!restoreFocus || typeof restoreFocus.focus !== 'function') {
            restoreFocus = document.activeElement;
        }

        compareState = {
            restoreFocus: restoreFocus
        };

        compareModal.classList.remove('hidden');
        compareModal.setAttribute('aria-hidden', 'false');
        updateCompareHeadCount();
        renderCompareModal();

        if (compareModalCloseButton) {
            focusWithoutScroll(compareModalCloseButton);
        }
    }

    function openLoginModal() {
        var redirectTo = window.location.href;

        if (typeof window.openAuthModal === 'function') {
            window.openAuthModal('login', { redirectTo: redirectTo });
            return true;
        }

        try {
            window.dispatchEvent(new CustomEvent('auth-modal:open', {
                detail: { mode: 'login', redirectTo: redirectTo }
            }));
            return true;
        } catch (_error) {}

        var trigger = document.querySelector('[data-auth-open][data-auth-mode="login"], [data-auth-open]');
        if (trigger && typeof trigger.click === 'function') {
            trigger.click();
            return true;
        }

        return false;
    }

    async function postLegacyAction(action, payload) {
        var params = new URLSearchParams();
        params.set('action', action);
        var csrfToken = document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute('content') || '';
        if (csrfToken) {
            params.set('_token', csrfToken);
        }

        Object.keys(payload || {}).forEach(function (key) {
            var value = payload[key];
            if (value === null || typeof value === 'undefined') {
                return;
            }
            params.set(key, String(value));
        });

        var response = await fetch('/sendajaxurl', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: params.toString(),
        });

        if (response.status === 419) {
            throw new Error('Session expired. Please refresh and try again.');
        }

        if (!response.ok) {
            throw new Error('Legacy action request failed');
        }

        return response.text();
    }

    function closeOpenFlyover(restoreFocus) {
        if (!openFlyover) {
            return;
        }
        openFlyover.classList.add('hidden');
        if (openFlyoverTrigger) {
            openFlyoverTrigger.setAttribute('aria-expanded', 'false');
            if (restoreFocus === true) {
                openFlyoverTrigger.focus();
            }
        }
        openFlyover = null;
        openFlyoverTrigger = null;
    }

    function focusWithoutScroll(target) {
        if (!target || typeof target.focus !== 'function') {
            return;
        }

        try {
            target.focus({ preventScroll: true });
            return;
        } catch (_error) {}

        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        target.focus();
        window.scrollTo(scrollX, scrollY);
    }

    function closeFeedbackModal(confirmed) {
        if (!feedbackModal || !feedbackState) {
            return;
        }

        var state = feedbackState;
        feedbackState = null;

        feedbackModal.classList.add('hidden');
        feedbackModal.setAttribute('aria-hidden', 'true');
        feedbackCancel.classList.add('hidden');

        feedbackModal.removeEventListener('click', state.onModalClick);
        feedbackConfirm.removeEventListener('click', state.onConfirmClick);
        feedbackCancel.removeEventListener('click', state.onCancelClick);

        if (state.restoreFocus && typeof state.restoreFocus.focus === 'function') {
            focusWithoutScroll(state.restoreFocus);
        }

        state.resolve(Boolean(confirmed));
    }

    function showFeedbackModal(options) {
        var config = options || {};
        var title = String(config.title || 'Notice').trim() || 'Notice';
        var message = String(config.message || '').trim();
        var confirmText = String(config.confirmText || 'OK').trim() || 'OK';
        var cancelText = String(config.cancelText || 'Cancel').trim() || 'Cancel';
        var needsCancel = config.mode === 'confirm';

        if (!feedbackModal || !feedbackTitle || !feedbackMessage || !feedbackConfirm || !feedbackCancel) {
            return Promise.resolve(false);
        }

        if (feedbackState) {
            closeFeedbackModal(false);
        }

        feedbackTitle.textContent = title;
        feedbackMessage.textContent = message;
        feedbackConfirm.textContent = confirmText;
        feedbackCancel.textContent = cancelText;
        feedbackCancel.classList.toggle('hidden', !needsCancel);

        feedbackModal.classList.remove('hidden');
        feedbackModal.setAttribute('aria-hidden', 'false');

        return new Promise(function (resolve) {
            var onConfirmClick = function (event) {
                event.preventDefault();
                closeFeedbackModal(true);
            };

            var onCancelClick = function (event) {
                event.preventDefault();
                closeFeedbackModal(false);
            };

            var onModalClick = function (event) {
                if (event.target === feedbackModal) {
                    closeFeedbackModal(false);
                }
            };

            feedbackState = {
                onConfirmClick: onConfirmClick,
                onCancelClick: onCancelClick,
                onModalClick: onModalClick,
                resolve: resolve,
                restoreFocus: document.activeElement
            };

            feedbackConfirm.addEventListener('click', onConfirmClick);
            feedbackCancel.addEventListener('click', onCancelClick);
            feedbackModal.addEventListener('click', onModalClick);

            if (needsCancel) {
                focusWithoutScroll(feedbackCancel);
                return;
            }
            focusWithoutScroll(feedbackConfirm);
        });
    }

    async function toggleCompareForCard(card) {
        var propId = getCardPropertyId(card);
        if (propId === '') {
            return;
        }

        if (compareIds.indexOf(propId) !== -1) {
            removeCompareId(propId);
            syncComparedCardsFromStorage();
            if (compareState) {
                if (!compareIds.length) {
                    closeCompareModal(true);
                } else {
                    renderCompareModal();
                }
            }
            return;
        }

        if (compareIds.length >= COMPARE_LIMIT) {
            await showFeedbackModal({
                title: 'Compare limit reached',
                message: 'You can compare up to 5 properties.'
            });
            return;
        }

        try {
            await postLegacyAction('getcompare', { prop_id: propId });
        } catch (_error) {}

        compareIds.push(propId);
        compareIds = parseCompareIds(compareIds.join(',')).slice(0, COMPARE_LIMIT);
        persistCompareIds();
        syncComparedCardsFromStorage();
        if (compareState) {
            renderCompareModal();
        }
    }

    async function toggleSaveForCard(card) {
        if (!isUserAuthenticated) {
            openLoginModal();
            return;
        }

        var propId = getCardFavoritePropertyId(card);
        if (propId === '') {
            return;
        }

        var wasSaved = card.getAttribute('data-saved') === '1';
        var nextSaved = card.getAttribute('data-saved') !== '1';
        setCardSaved(card, nextSaved);
        updateFavoriteLookupForCard(propId, nextSaved);

        try {
            var response = await fetch('/api/property/' + encodeURIComponent(propId) + '/favorite-toggle', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    action: nextSaved ? 'add' : 'remove',
                }),
            });

            var payload = await response.json().catch(function () {
                return null;
            });

            if (!response.ok || !(payload && payload.success !== false)) {
                throw new Error((payload && payload.message) || 'Unable to update collection');
            }

            var serverSaved = Boolean(payload && payload.data && payload.data.is_favorite);
            setCardSaved(card, serverSaved);
            updateFavoriteLookupForCard(propId, serverSaved);
            await refreshFavoritesLookupFromServer();
        } catch (_error) {
            setCardSaved(card, wasSaved);
            updateFavoriteLookupForCard(propId, wasSaved);
            await showFeedbackModal({
                title: 'Unable to update collection',
                message: 'We could not save this listing right now. Please try again.'
            });
        }
    }

    async function hideCard(card) {
        var propId = getCardPropertyId(card);

        if (propId !== '') {
            try {
                await postLegacyAction('hide_property', { pid: propId });
            } catch (_error) {}
        }

        if (card.getAttribute('data-compared') === '1' && propId !== '') {
            removeCompareId(propId);
            syncComparedCardsFromStorage();
            if (compareState) {
                if (!compareIds.length) {
                    closeCompareModal(true);
                } else {
                    renderCompareModal();
                }
            }
        }

        if (card.getAttribute('data-saved') === '1') {
            setCardSaved(card, false);
            if (propId !== '') {
                postLegacyAction('remove_favourite', { propid: propId }).catch(function () {});
            }
        }

        card.style.display = 'none';
        updateVisibleCount();
        updateUnhideAllButton();
    }

    function getSharePayload(card) {
        var linkNode = card ? card.querySelector('.fs-card-media-link') : null;
        var titleNode = card ? card.querySelector('.fs-card-address') : null;

        return {
            url: linkNode && linkNode.href ? linkNode.href : window.location.href,
            title: titleNode ? String(titleNode.textContent || '').trim() : 'Property listing'
        };
    }

    function getCardDetailUrl(card) {
        var linkNode = card ? card.querySelector('.fs-card-media-link') : null;
        if (!linkNode) {
            return '';
        }

        var href = String(linkNode.getAttribute('href') || '').trim();
        return href;
    }

    async function copyTextToClipboard(value) {
        var text = String(value || '').trim();
        if (!text) {
            return false;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (_clipboardError) {}
        }

        var initialScrollX = window.scrollX;
        var initialScrollY = window.scrollY;
        var helperInput = document.createElement('input');
        helperInput.type = 'text';
        helperInput.value = text;
        helperInput.style.position = 'fixed';
        helperInput.style.left = '-9999px';
        document.body.appendChild(helperInput);
        helperInput.select();

        var copied = false;
        try {
            copied = document.execCommand('copy');
        } catch (_legacyCopyError) {
            copied = false;
        }

        document.body.removeChild(helperInput);
        if (window.scrollX !== initialScrollX || window.scrollY !== initialScrollY) {
            window.scrollTo(initialScrollX, initialScrollY);
        }

        return copied;
    }

    function buildShareTargetUrl(target, payload) {
        var encodedUrl = encodeURIComponent(payload.url || '');
        var encodedTitle = encodeURIComponent(payload.title || 'Property listing');

        if (target === 'facebook') {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl;
        }
        if (target === 'twitter') {
            return 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle;
        }
        if (target === 'whatsapp') {
            return 'https://wa.me/?text=' + encodeURIComponent((payload.title || 'Property listing') + ' ' + (payload.url || ''));
        }
        if (target === 'telegram') {
            return 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle;
        }

        return '';
    }

    function closeShareModal(restoreFocus) {
        if (!shareModal || !shareState) {
            return;
        }

        var state = shareState;
        shareState = null;
        shareModal.classList.add('hidden');
        shareModal.setAttribute('aria-hidden', 'true');

        if (shareCopyButton) {
            shareCopyButton.textContent = 'Copy';
        }

        if (restoreFocus && state.restoreFocus) {
            focusWithoutScroll(state.restoreFocus);
        }
    }

    function openShareModal(card, triggerButton) {
        if (!shareModal || !shareLinkInput) {
            return;
        }

        var restoreFocusTarget = null;
        if (openFlyoverTrigger && typeof openFlyoverTrigger.focus === 'function') {
            restoreFocusTarget = openFlyoverTrigger;
        } else if (triggerButton && typeof triggerButton.focus === 'function') {
            restoreFocusTarget = triggerButton;
        } else if (document.activeElement && typeof document.activeElement.focus === 'function') {
            restoreFocusTarget = document.activeElement;
        }

        var payload = getSharePayload(card);
        shareState = {
            payload: payload,
            restoreFocus: restoreFocusTarget
        };

        shareLinkInput.value = payload.url;
        if (shareCopyButton) {
            shareCopyButton.textContent = 'Copy';
        }

        shareModal.classList.remove('hidden');
        shareModal.setAttribute('aria-hidden', 'false');

        if (shareCloseButton) {
            focusWithoutScroll(shareCloseButton);
        }
    }

    async function handleShareTarget(target) {
        if (!shareState || !shareState.payload) {
            return;
        }

        if (target === 'instagram') {
            var copiedInstagram = await copyTextToClipboard(shareState.payload.url);
            closeShareModal(true);
            if (copiedInstagram) {
                await showFeedbackModal({
                    title: 'Link copied',
                    message: 'Instagram web share is limited. The listing link was copied for you.'
                });
                return;
            }
            await showFeedbackModal({
                title: 'Unable to copy link',
                message: 'Please copy the listing URL manually.'
            });
            return;
        }

        var targetUrl = buildShareTargetUrl(target, shareState.payload);
        if (!targetUrl) {
            return;
        }

        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        closeShareModal(true);
    }

    async function shareCard(card, triggerButton) {
        if (!card) {
            return;
        }

        openShareModal(card, triggerButton);
    }

    if (shareModal) {
        shareModal.addEventListener('click', function (event) {
            if (event.target === shareModal) {
                closeShareModal(true);
                return;
            }

            var targetButton = event.target.closest('[data-share-target]');
            if (targetButton) {
                event.preventDefault();
                handleShareTarget(targetButton.getAttribute('data-share-target') || '');
            }
        });
    }

    if (shareCloseButton) {
        shareCloseButton.addEventListener('click', function (event) {
            event.preventDefault();
            closeShareModal(true);
        });
    }

    if (shareCopyButton) {
        shareCopyButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (!shareState || !shareState.payload) {
                return;
            }

            copyTextToClipboard(shareState.payload.url).then(function (copied) {
                if (!copied) {
                    showFeedbackModal({
                        title: 'Unable to copy link',
                        message: 'Please copy the listing URL manually.'
                    });
                    return;
                }

                shareCopyButton.textContent = 'Copied';
                setTimeout(function () {
                    if (shareState) {
                        shareCopyButton.textContent = 'Copy';
                    }
                }, 1200);
            });
        });
    }

    if (compareHeadBtn) {
        compareHeadBtn.addEventListener('click', function (event) {
            event.preventDefault();
            openCompareModal(compareHeadBtn);
        });
    }

    if (compareModal) {
        compareModal.addEventListener('click', function (event) {
            if (event.target === compareModal) {
                closeCompareModal(true);
                return;
            }

            var removeButton = event.target.closest('[data-compare-remove]');
            if (!removeButton) {
                return;
            }

            event.preventDefault();
            var removeId = normalizePropertyId(removeButton.getAttribute('data-compare-remove') || '');
            if (removeId === '') {
                return;
            }

            removeCompareId(removeId);
            syncComparedCardsFromStorage();

            if (!compareIds.length) {
                closeCompareModal(true);
                return;
            }

            renderCompareModal();
        });
    }

    if (compareModalCloseButton) {
        compareModalCloseButton.addEventListener('click', function (event) {
            event.preventDefault();
            closeCompareModal(true);
        });
    }

    async function restoreAllHiddenListings() {
        if (restoringHiddenInFlight) {
            return;
        }

        restoringHiddenInFlight = true;
        if (unhideAllBtn) {
            unhideAllBtn.disabled = true;
        }

        showLoadingIndicator('Restoring hidden listings...');

        try {
            await postLegacyAction('restore_property', {});
        } catch (_error) {}

        document.querySelectorAll('.fs-card').forEach(function (card) {
            if (card.style.display === 'none') {
                card.style.display = '';
            }
        });

        hiddenSessionCount = 0;
        updateVisibleCount();
        updateUnhideAllButton();

        var refreshUrl = window.location.pathname + window.location.search;
        window.location.assign(refreshUrl);
    }

    if (unhideAllBtn) {
        unhideAllBtn.addEventListener('click', function (event) {
            event.preventDefault();
            restoreAllHiddenListings();
        });
    }

    function bindListingDynamicContent(scope) {
        var rootNode = scope || document;

        rootNode.querySelectorAll('[data-card-menu-toggle]').forEach(function (button) {
            if (button.dataset.boundCardMenu === '1') {
                return;
            }
            button.dataset.boundCardMenu = '1';

            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var wrap = button.closest('.fs-card-menu-wrap');
                var flyover = wrap ? wrap.querySelector('[data-card-flyover]') : null;
                if (!flyover) {
                    return;
                }

                var shouldOpen = flyover.classList.contains('hidden');
                closeOpenFlyover();

                if (shouldOpen) {
                    flyover.classList.remove('hidden');
                    button.setAttribute('aria-expanded', 'true');
                    openFlyover = flyover;
                    openFlyoverTrigger = button;

                    var firstMenuItem = flyover.querySelector('[data-card-action]');
                    if (firstMenuItem) {
                        firstMenuItem.focus();
                    }
                }
            });
        });

        rootNode.querySelectorAll('[data-card-flyover]').forEach(function (flyover) {
            if (flyover.dataset.boundCardFlyover === '1') {
                return;
            }
            flyover.dataset.boundCardFlyover = '1';

            flyover.addEventListener('click', function (event) {
                var actionBtn = event.target.closest('[data-card-action]');
                if (!actionBtn) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                var action = actionBtn.getAttribute('data-card-action');
                var card = actionBtn.closest('.fs-card');
                if (!card) {
                    closeOpenFlyover();
                    return;
                }

                if (action === 'hide') {
                    closeOpenFlyover();
                    hideCard(card);
                    return;
                }

                if (action === 'compare') {
                    closeOpenFlyover();
                    toggleCompareForCard(card);
                    return;
                }

                if (action === 'share') {
                    shareCard(card, actionBtn);
                    closeOpenFlyover();
                }
            });

            flyover.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeOpenFlyover(true);
                }
            });
        });

        rootNode.querySelectorAll('.fs-card').forEach(function (card) {
            if (card.dataset.boundMapCard === '1') {
                return;
            }
            card.dataset.boundMapCard = '1';

            var propId = getCardPropertyId(card);
            if (!propId) {
                return;
            }
            var openInNewTab = card.getAttribute('data-open-detail-new-tab') === '1';
            var detailUrl = String(card.getAttribute('data-detail-url') || '').trim();

            card.addEventListener('mouseenter', function () {
                applyMapMarkerHighlight(propId);
            });

            card.addEventListener('mouseleave', function () {
                clearMapMarkerHighlight(propId);
            });

            card.addEventListener('focusin', function () {
                applyMapMarkerHighlight(propId);
            });

            card.addEventListener('focusout', function (event) {
                if (card.contains(event.relatedTarget)) {
                    return;
                }
                clearMapMarkerHighlight(propId);
            });

            if (openInNewTab && detailUrl) {
                card.addEventListener('click', function (event) {
                    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                        return;
                    }

                    if (event.target && event.target.closest('a,button,input,select,textarea,label,[role="button"]')) {
                        return;
                    }

                    event.preventDefault();
                    window.open(detailUrl, '_blank', 'noopener,noreferrer');
                });
            }
        });

        rootNode.querySelectorAll('.fs-pagination a').forEach(function (link) {
            if (link.dataset.boundPagination === '1') {
                return;
            }
            link.dataset.boundPagination = '1';

            link.addEventListener('click', function (event) {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                    return;
                }
                event.preventDefault();
                var nextUrl = new URL(link.href, window.location.origin);
                var targetPage = Number(nextUrl.searchParams.get('page') || 1);
                loadResultsPageInBackground(nextUrl, '', Number.isFinite(targetPage) ? targetPage : 1, {
                    fallbackToLocation: false,
                    message: 'Loading next page...',
                    updateMap: false
                });
            });
        });
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-card-save-toggle]');
        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        var card = button.closest('.fs-card');
        if (!card) {
            return;
        }

        toggleSaveForCard(card);
    });

    bindListingDynamicContent(document);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            if (compareState) {
                event.preventDefault();
                closeCompareModal(true);
                return;
            }
            if (shareState) {
                event.preventDefault();
                closeShareModal(true);
                return;
            }
            if (feedbackState) {
                event.preventDefault();
                closeFeedbackModal(false);
                return;
            }
            closeOpenFlyover(true);
        }
    });

    syncSavedCardsFromDom();
    seedFavoritesLookupFromDom();
    if (isUserAuthenticated) {
        refreshFavoritesLookupFromServer();
    }
    loadCompareIdsFromStorage();
    syncComparedCardsFromStorage();
    updateVisibleCount();
    updateUnhideAllButton();

    var mapFallback = document.getElementById('fs-map-fallback');
    var mapElement = document.getElementById('fs-map');
    var mapMarkerRegistry = Object.create(null);
    var activeMapMarkerId = '';
    var hoveredPropertyId = '';
    var activeMapPopup = null;
    var mapboxRenderedMarkers = [];
    var mapboxSpiderMarkers = [];
    var mapboxSpiderClusterMarker = null;
    var mapboxRenderToken = 0;
    var suppressMapboxMoveRender = false;
    var MAP_PIN_DEFAULT_COLOR = '#f9ae8c';
    var MAP_PIN_ACTIVE_COLOR = (function () {
        try {
            var rootStyles = window.getComputedStyle(document.documentElement);
            var explicitValue = String(rootStyles.getPropertyValue('--color-brand-purple') || '').trim();
            if (explicitValue) {
                return explicitValue;
            }

            var channelValue = String(rootStyles.getPropertyValue('--brand-purple-channels') || '').trim();
            if (channelValue) {
                return 'hsl(' + channelValue + ')';
            }

            var fallbackValue = String(rootStyles.getPropertyValue('--color-french-blue-sky-100') || '').trim();
            return fallbackValue || '#8193f4';
        } catch (_error) {
            return '#8193f4';
        }
    })();

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function formatPrice(value) {
        var amount = Number(value || 0);
        if (!Number.isFinite(amount) || amount <= 0) {
            return '$0';
        }
        return '$' + Math.round(amount).toLocaleString('en-US');
    }

    function normalizeMapPropertyId(rawValue) {
        return normalizePropertyId(rawValue);
    }

    function buildGoogleMapPinIcon(mapsApi, isActive) {
        return {
            path: mapsApi.SymbolPath.CIRCLE,
            fillColor: isActive ? MAP_PIN_ACTIVE_COLOR : MAP_PIN_DEFAULT_COLOR,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: isActive ? 15 : 14,
        };
    }

    function buildMapboxMapPinElement(labelText, isActive) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'fs-mapbox-marker-btn';
        button.setAttribute('aria-label', 'Listing map marker');
        button.style.background = 'transparent';
        button.style.border = '0';
        button.style.padding = '0';
        button.style.cursor = 'pointer';
        button.style.display = 'block';
        button.innerHTML = '<span class="fs-map-marker' + (isActive ? ' is-active' : '') + '" aria-hidden="true"></span>';
        return button;
    }

    function buildMapboxClusterElement(count) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'fs-mapbox-marker-btn';
        button.setAttribute('aria-label', String(count) + ' listings. Zoom in to expand.');
        button.style.background = 'transparent';
        button.style.border = '0';
        button.style.padding = '0';
        button.style.cursor = 'pointer';
        button.style.display = 'block';
        button.innerHTML = '<span class="fs-map-cluster-marker">' + String(count) + '</span>';
        return button;
    }

    function buildLeafletMapPinIcon(leafletApi, labelText, isActive) {
        var activeClass = isActive ? ' is-active' : '';
        return leafletApi.divIcon({
            className: 'fs-map-div-icon',
            html: '<span class="fs-map-marker' + activeClass + '" aria-hidden="true"></span>',
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -14],
        });
    }

    function setMapMarkerActiveState(propertyId, isActive) {
        var normalizedId = normalizeMapPropertyId(propertyId);
        if (!normalizedId || !mapMarkerRegistry[normalizedId]) {
            return;
        }

        var markerRef = mapMarkerRegistry[normalizedId];
        if (markerRef.provider === 'google') {
            markerRef.marker.setIcon(buildGoogleMapPinIcon(markerRef.mapsApi, isActive));
            return;
        }

        if (markerRef.provider === 'leaflet') {
            markerRef.marker.setIcon(buildLeafletMapPinIcon(markerRef.leafletApi, markerRef.labelText, isActive));
            return;
        }

        if (markerRef.provider === 'mapbox') {
            var markerEl = markerRef.marker && typeof markerRef.marker.getElement === 'function' ? markerRef.marker.getElement() : null;
            var markerNode = markerEl ? markerEl.querySelector('.fs-map-marker') : null;
            if (markerNode) {
                markerNode.classList.toggle('is-active', isActive);
            }
        }
    }

    function applyMapMarkerHighlight(propertyId) {
        var normalizedId = normalizeMapPropertyId(propertyId);
        hoveredPropertyId = normalizedId;

        if (!normalizedId) {
            return;
        }

        if (activeMapMarkerId && activeMapMarkerId !== normalizedId) {
            setMapMarkerActiveState(activeMapMarkerId, false);
            activeMapMarkerId = '';
        }

        if (!mapMarkerRegistry[normalizedId]) {
            return;
        }

        setMapMarkerActiveState(normalizedId, true);
        activeMapMarkerId = normalizedId;
    }

    function clearMapMarkerHighlight(propertyId) {
        var normalizedId = normalizeMapPropertyId(propertyId);
        if (normalizedId && hoveredPropertyId === normalizedId) {
            hoveredPropertyId = '';
        }

        if (!activeMapMarkerId) {
            return;
        }

        if (normalizedId && activeMapMarkerId !== normalizedId) {
            return;
        }

        setMapMarkerActiveState(activeMapMarkerId, false);
        activeMapMarkerId = '';
    }

    function registerMapMarker(propertyId, markerRef) {
        var normalizedId = normalizeMapPropertyId(propertyId);
        if (!normalizedId) {
            return;
        }

        mapMarkerRegistry[normalizedId] = markerRef;

        if (hoveredPropertyId && hoveredPropertyId === normalizedId) {
            applyMapMarkerHighlight(normalizedId);
        }
    }

    function closeMapPopup() {
        if (activeMapPopup) {
            activeMapPopup.remove();
            activeMapPopup = null;
        }
    }

    function clearMapboxMarkerList(markers) {
        markers.forEach(function (marker) {
            if (marker && typeof marker.remove === 'function') {
                marker.remove();
            }
        });
        markers.length = 0;
    }

    function clearMapboxSpiderMarkers() {
        clearMapboxMarkerList(mapboxSpiderMarkers);
        if (mapboxSpiderClusterMarker && typeof mapboxSpiderClusterMarker.getElement === 'function') {
            mapboxSpiderClusterMarker.getElement().style.display = '';
        }
        mapboxSpiderClusterMarker = null;
    }

    function showMapFallback() {
        if (mapFallback) {
            mapFallback.classList.remove('hidden');
        }
    }

    function hideMapFallback() {
        if (mapFallback) {
            mapFallback.classList.add('hidden');
        }
    }

    function findMapListingById(propertyId) {
        var normalizedPropertyId = normalizeMapPropertyId(propertyId);
        if (!normalizedPropertyId) {
            return null;
        }

        for (var index = 0; index < listings.length; index += 1) {
            if (normalizeMapPropertyId(listings[index] && listings[index].id) === normalizedPropertyId) {
                return listings[index];
            }
        }

        return null;
    }

    function parseMapListingsFromDocument(sourceDocument) {
        var dataNode = sourceDocument ? sourceDocument.getElementById('fs-map-listings-data') : null;
        if (!dataNode) {
            return null;
        }

        try {
            var parsed = JSON.parse(dataNode.textContent || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
            return null;
        }
    }

    function updateResultsHeaderFromDocument(nextDocument) {
        var nextHeading = nextDocument.querySelector('.fs-results-header h1');
        var currentHeading = document.querySelector('.fs-results-header h1');
        if (nextHeading && currentHeading) {
            currentHeading.textContent = nextHeading.textContent;
        }

        var nextCountWrap = nextDocument.querySelector('.fs-results-header p');
        var currentCountWrap = document.querySelector('.fs-results-header p');
        if (nextCountWrap && currentCountWrap) {
            currentCountWrap.innerHTML = nextCountWrap.innerHTML;
        }
    }

    async function loadResultsPageInBackground(url, propertyId, targetPage, options) {
        var settings = Object.assign({
            fallbackToLocation: true,
            message: 'Loading',
            updateMap: false
        }, options || {});
        var token = resultsPageLoadToken + 1;
        resultsPageLoadToken = token;
        showLoadingIndicator(settings.message);

        try {
            var response = await fetch(url.toString(), {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'text/html',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                throw new Error('Unable to load listing page');
            }

            var html = await response.text();
            if (token !== resultsPageLoadToken) {
                return true;
            }

            var nextDocument = new DOMParser().parseFromString(html, 'text/html');
            var nextResultsList = nextDocument.querySelector('#fs-results-list');
            var currentResultsList = document.getElementById('fs-results-list');
            if (!nextResultsList || !currentResultsList) {
                throw new Error('Listing results were not found');
            }

            closeOpenFlyover();
            currentResultsList.innerHTML = nextResultsList.innerHTML;
            updateResultsHeaderFromDocument(nextDocument);

            var nextPagination = nextDocument.querySelector('.fs-pagination');
            var currentPagination = document.querySelector('.fs-pagination');
            if (nextPagination) {
                var adoptedPagination = document.importNode(nextPagination, true);
                if (currentPagination) {
                    currentPagination.replaceWith(adoptedPagination);
                } else {
                    currentResultsList.insertAdjacentElement('afterend', adoptedPagination);
                }
            } else if (currentPagination) {
                currentPagination.remove();
            }

            currentResultsPage = Math.max(1, Number(targetPage || currentResultsPage || 1));
            var pageSize = Math.max(1, Number(currentResultsPageSize || 18));
            if (limitHiddenInput) {
                limitHiddenInput.value = String(pageSize);
            }
            if (offsetHiddenInput) {
                offsetHiddenInput.value = String((currentResultsPage - 1) * pageSize);
            }

            syncSavedCardsFromDom();
            seedFavoritesLookupFromDom();
            if (isUserAuthenticated) {
                refreshFavoritesLookupFromServer();
            }
            syncComparedCardsFromStorage();
            bindListingDynamicContent(document);
            updateVisibleCount();
            updateUnhideAllButton();

            if (settings.updateMap) {
                var nextListings = parseMapListingsFromDocument(nextDocument);
                if (nextListings !== null) {
                    listings = nextListings;
                    var currentMapDataNode = document.getElementById('fs-map-listings-data');
                    if (currentMapDataNode) {
                        currentMapDataNode.textContent = JSON.stringify(nextListings);
                    }
                    initMap();
                }
            }

            try {
                var visibleUrl = new URL(url.toString());
                visibleUrl.searchParams.delete('map_focus');
                window.history.pushState({}, document.title, visibleUrl.toString());
                if (form) {
                    form.setAttribute('action', visibleUrl.pathname);
                }
            } catch (_error) {}

            if (propertyId) {
                window.setTimeout(function () {
                    focusPropertyCard(propertyId, { allowNavigate: false });
                }, 60);
            }
            return true;
        } catch (_error) {
            if (settings.fallbackToLocation) {
                window.location.href = url.toString();
            }
            return true;
        } finally {
            if (token === resultsPageLoadToken) {
                hideLoadingIndicator();
            }
        }
    }

    function navigateToMapListingPage(propertyId) {
        var listing = findMapListingById(propertyId);
        var targetPage = listing && Number.isFinite(Number(listing.page)) ? Math.max(1, Number(listing.page)) : null;
        if (!targetPage || targetPage === Number(currentResultsPage || 1)) {
            return false;
        }

        var pageSize = Math.max(1, Number(currentResultsPageSize || 18));
        var url = new URL(window.location.href);
        url.searchParams.set('page', String(targetPage));
        url.searchParams.set('limit', String(pageSize));
        url.searchParams.set('offset', String((targetPage - 1) * pageSize));
        url.searchParams.set('map_focus', normalizeMapPropertyId(propertyId));
        loadResultsPageInBackground(url, normalizeMapPropertyId(propertyId), targetPage);
        return true;
    }

    function getRequestedMapFocusPropertyId() {
        try {
            return normalizeMapPropertyId(new URL(window.location.href).searchParams.get('map_focus') || '');
        } catch (_error) {
            return '';
        }
    }

    function focusPropertyCard(propertyId, options) {
        var settings = Object.assign({ allowNavigate: true }, options || {});
        var card = null;
        var normalizedPropertyId = normalizeMapPropertyId(propertyId);
        document.querySelectorAll('.fs-card').forEach(function (node) {
            node.classList.remove('is-map-focus');
            if (node.dataset.mapFocusTimer) {
                window.clearTimeout(Number(node.dataset.mapFocusTimer));
                delete node.dataset.mapFocusTimer;
            }

            if (!card && getCardPropertyId(node) === normalizedPropertyId) {
                card = node;
            }
        });

        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('is-map-focus');
            card.dataset.mapFocusTimer = String(window.setTimeout(function () {
                card.classList.remove('is-map-focus');
                delete card.dataset.mapFocusTimer;
            }, 3200));
            return true;
        }

        if (settings.allowNavigate) {
            return navigateToMapListingPage(normalizedPropertyId);
        }

        return false;
    }

    function listingPopupHtml(item) {
        var cityState = [item.city, item.state].filter(Boolean).join(', ');
        var fullAddress = [item.address, cityState].filter(Boolean).join(', ');

        // Look up the card DOM element to get image + meta
        var imgSrc = '';
        var metaText = '';
        var card = document.querySelector('[data-property-id="' + (item.id || '') + '"]');
        if (card) {
            var cardImg = card.querySelector('.fs-card-media-link img');
            if (cardImg) { imgSrc = cardImg.getAttribute('src') || ''; }
            var cardMeta = card.querySelector('.fs-card-meta');
            if (cardMeta) { metaText = (cardMeta.textContent || '').trim().replace(/\s+/g, ' '); }
        }

        var imgHtml = imgSrc
            ? '<img src="' + escapeHtml(imgSrc) + '" alt="" class="fs-map-popup-img" loading="lazy">'
            : '<span class="fs-map-popup-img-placeholder"></span>';

        var metaHtml = metaText
            ? '<span class="fs-map-popup-meta">' + escapeHtml(metaText) + '</span>'
            : '';

        return '' +
            '<a href="' + escapeHtml(item.url || '#') + '" class="fs-map-popup-card" data-map-popup-property-id="' + escapeHtml(item.id || '') + '" target="_blank" rel="noopener noreferrer">' +
                imgHtml +
                '<div class="fs-map-popup-body">' +
                    '<strong class="fs-map-popup-price">' + escapeHtml(formatPrice(item.price)) + '</strong>' +
                    metaHtml +
                    '<span class="fs-map-popup-address">' + escapeHtml(fullAddress) + '</span>' +
                '</div>' +
            '</a>';
    }

    document.addEventListener('click', function (event) {
        var popupButton = event.target && event.target.closest ? event.target.closest('[data-map-popup-property-id]') : null;
        if (!popupButton) {
            return;
        }

        // Don't preventDefault — the <a> tag navigates to the listing
        focusPropertyCard(popupButton.getAttribute('data-map-popup-property-id') || '');
    });

    var requestedMapFocusPropertyId = getRequestedMapFocusPropertyId();
    if (requestedMapFocusPropertyId) {
        window.setTimeout(function () {
            focusPropertyCard(requestedMapFocusPropertyId, { allowNavigate: false });
            try {
                var url = new URL(window.location.href);
                url.searchParams.delete('map_focus');
                window.history.replaceState({}, document.title, url.toString());
            } catch (_error) {
                // Keep the URL as-is when history manipulation is unavailable.
            }
        }, 250);
    }

    function getMapPointLatLng(item) {
        var markerLat = Number.isFinite(Number(item.displayLat)) ? Number(item.displayLat) : Number(item.lat);
        var markerLng = Number.isFinite(Number(item.displayLng)) ? Number(item.displayLng) : Number(item.lng);
        return {
            lat: markerLat,
            lng: markerLng,
        };
    }

    function clusterMapboxPoints(map, points) {
        var zoom = typeof map.getZoom === 'function' ? map.getZoom() : 12;
        var radius = zoom >= 17 ? 14 : (zoom >= 15 ? 30 : 48);
        var projected = points.map(function (item) {
            var coords = getMapPointLatLng(item);
            var point = map.project([coords.lng, coords.lat]);
            return {
                item: item,
                lat: coords.lat,
                lng: coords.lng,
                point: point,
                visited: false,
            };
        });
        var clusters = [];

        projected.forEach(function (entry, index) {
            if (entry.visited) {
                return;
            }

            var members = [entry];
            entry.visited = true;

            for (var nextIndex = index + 1; nextIndex < projected.length; nextIndex += 1) {
                var candidate = projected[nextIndex];
                if (candidate.visited) {
                    continue;
                }

                var dx = candidate.point.x - entry.point.x;
                var dy = candidate.point.y - entry.point.y;
                if (Math.sqrt((dx * dx) + (dy * dy)) <= radius) {
                    candidate.visited = true;
                    members.push(candidate);
                }
            }

            var centerX = members.reduce(function (sum, member) { return sum + member.point.x; }, 0) / members.length;
            var centerY = members.reduce(function (sum, member) { return sum + member.point.y; }, 0) / members.length;
            var centerLngLat = map.unproject([centerX, centerY]);
            var minDistance = Infinity;
            members.forEach(function (member, memberIndex) {
                for (var compareIndex = memberIndex + 1; compareIndex < members.length; compareIndex += 1) {
                    var compare = members[compareIndex];
                    var deltaX = compare.point.x - member.point.x;
                    var deltaY = compare.point.y - member.point.y;
                    minDistance = Math.min(minDistance, Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));
                }
            });

            clusters.push({
                center: [centerLngLat.lng, centerLngLat.lat],
                items: members.map(function (member) { return member.item; }),
                tight: members.length > 1 && minDistance < 18,
            });
        });

        return clusters;
    }

    function openMapboxListingPopup(mapboxApi, map, item, lngLat) {
        closeMapPopup();
        activeMapPopup = new mapboxApi.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 14,
            maxWidth: '220px',
        })
            .setLngLat(lngLat)
            .setDOMContent((function () {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = listingPopupHtml(item);
                return wrapper.firstChild || wrapper;
            })())
            .addTo(map);
        focusPropertyCard(item.id);
    }

    function addMapboxListingMarker(mapboxApi, map, item, lngLat, targetList) {
        var markerEl = buildMapboxMapPinElement('', false);
        var marker = new mapboxApi.Marker({
            element: markerEl,
            anchor: 'center',
        }).setLngLat(lngLat).addTo(map);

        targetList.push(marker);
        registerMapMarker(item.id, {
            provider: 'mapbox',
            marker: marker,
            labelText: '',
        });

        markerEl.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            openMapboxListingPopup(mapboxApi, map, item, lngLat);
        });
    }

    function getMapboxClusterBounds(mapboxApi, cluster) {
        var bounds = new mapboxApi.LngLatBounds();
        var hasPoint = false;
        (cluster.items || []).forEach(function (item) {
            var coords = getMapPointLatLng(item);
            if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lng)) {
                return;
            }

            bounds.extend([coords.lng, coords.lat]);
            hasPoint = true;
        });

        return hasPoint ? bounds : null;
    }

    function mapboxBoundsHaveArea(bounds) {
        if (!bounds || typeof bounds.getNorthEast !== 'function' || typeof bounds.getSouthWest !== 'function') {
            return false;
        }

        var northEast = bounds.getNorthEast();
        var southWest = bounds.getSouthWest();
        return Math.abs(Number(northEast.lng) - Number(southWest.lng)) > 0.00001
            || Math.abs(Number(northEast.lat) - Number(southWest.lat)) > 0.00001;
    }

    function expandMapboxCluster(mapboxApi, map, cluster) {
        var currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 12;
        var bounds = getMapboxClusterBounds(mapboxApi, cluster);
        clearMapboxSpiderMarkers();

        if (bounds && mapboxBoundsHaveArea(bounds) && typeof map.fitBounds === 'function') {
            map.fitBounds(bounds, {
                padding: 92,
                maxZoom: Math.min(Math.max(currentZoom + 3, 15), 18),
                duration: 420,
            });
            return;
        }

        map.easeTo({
            center: cluster.center,
            zoom: Math.min(currentZoom + 2, 18),
            duration: 420,
        });
    }

    function spiderfyMapboxCluster(mapboxApi, map, cluster, clusterMarker) {
        clearMapboxSpiderMarkers();
        closeMapPopup();
        mapboxSpiderClusterMarker = clusterMarker || null;
        if (mapboxSpiderClusterMarker && typeof mapboxSpiderClusterMarker.getElement === 'function') {
            mapboxSpiderClusterMarker.getElement().style.display = 'none';
        }

        var centerPoint = map.project(cluster.center);
        var count = cluster.items.length;
        var radius = Math.min(86, Math.max(38, 24 + (count * 4)));

        cluster.items.forEach(function (item, index) {
            var angle = ((Math.PI * 2) / count) * index;
            var spiderPoint = {
                x: centerPoint.x + (Math.cos(angle) * radius),
                y: centerPoint.y + (Math.sin(angle) * radius),
            };
            var spiderLngLat = map.unproject([spiderPoint.x, spiderPoint.y]);
            addMapboxListingMarker(mapboxApi, map, item, [spiderLngLat.lng, spiderLngLat.lat], mapboxSpiderMarkers);
        });
    }

    function renderMapboxMarkerBatches(mapboxApi, map, points) {
        var token = mapboxRenderToken + 1;
        mapboxRenderToken = token;
        clearMapboxMarkerList(mapboxRenderedMarkers);
        clearMapboxSpiderMarkers();
        mapMarkerRegistry = Object.create(null);
        activeMapMarkerId = '';

        var clusters = clusterMapboxPoints(map, points);
        var index = 0;
        var batchSize = 60;

        function renderNextBatch() {
            if (token !== mapboxRenderToken) {
                return;
            }

            var end = Math.min(index + batchSize, clusters.length);
            for (; index < end; index += 1) {
                (function (cluster) {
                    if (cluster.items.length === 1) {
                        var item = cluster.items[0];
                        var coords = getMapPointLatLng(item);
                        addMapboxListingMarker(mapboxApi, map, item, [coords.lng, coords.lat], mapboxRenderedMarkers);
                        return;
                    }

                    var markerEl = buildMapboxClusterElement(cluster.items.length);
                    var marker = new mapboxApi.Marker({
                        element: markerEl,
                        anchor: 'center',
                    }).setLngLat(cluster.center).addTo(map);
                    mapboxRenderedMarkers.push(marker);

                    markerEl.addEventListener('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 12;

                        if (cluster.items.length <= 12 && cluster.tight && currentZoom >= 18) {
                            spiderfyMapboxCluster(mapboxApi, map, cluster, marker);
                            return;
                        }

                        expandMapboxCluster(mapboxApi, map, cluster);
                    });
                })(clusters[index]);
            }

            if (index < clusters.length) {
                window.requestAnimationFrame(renderNextBatch);
            }
        }

        renderNextBatch();
    }

    function loadLeafletAssets() {
        if (window.L && typeof window.L.map === 'function') {
            return Promise.resolve(window.L);
        }

        var cssPromise = new Promise(function (resolve, reject) {
            var existingCss = document.querySelector('link[data-leaflet-loader="for-sale"]');
            if (existingCss) {
                resolve();
                return;
            }

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.dataset.leafletLoader = 'for-sale';
            link.onload = function () {
                resolve();
            };
            link.onerror = function () {
                reject(new Error('Leaflet CSS failed to load'));
            };
            document.head.appendChild(link);
        });

        var scriptPromise = new Promise(function (resolve, reject) {
            var existingScript = document.querySelector('script[data-leaflet-loader="for-sale"]');
            if (existingScript) {
                if (window.L && typeof window.L.map === 'function') {
                    resolve(window.L);
                    return;
                }
                existingScript.addEventListener('load', function () {
                    if (window.L && typeof window.L.map === 'function') {
                        resolve(window.L);
                        return;
                    }
                    reject(new Error('Leaflet failed to initialize'));
                });
                existingScript.addEventListener('error', function () {
                    reject(new Error('Leaflet script failed to load'));
                });
                return;
            }

            var script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            script.defer = true;
            script.dataset.leafletLoader = 'for-sale';
            script.onload = function () {
                if (window.L && typeof window.L.map === 'function') {
                    resolve(window.L);
                    return;
                }
                reject(new Error('Leaflet failed to initialize'));
            };
            script.onerror = function () {
                reject(new Error('Leaflet script failed to load'));
            };
            document.head.appendChild(script);
        });

        return Promise.all([cssPromise, scriptPromise]).then(function () {
            return window.L;
        });
    }

    function loadGoogleMapsApi(apiKey) {
        if (!apiKey) {
            return Promise.reject(new Error('Missing Google Maps API key'));
        }

        if (window.google && window.google.maps) {
            return Promise.resolve(window.google.maps);
        }

        return new Promise(function (resolve, reject) {
            var existing = document.querySelector('script[data-google-maps-loader="for-sale"]');
            if (existing) {
                existing.addEventListener('load', function () {
                    if (window.google && window.google.maps) {
                        resolve(window.google.maps);
                    } else {
                        reject(new Error('Google Maps failed to initialize'));
                    }
                });
                existing.addEventListener('error', function () {
                    reject(new Error('Google Maps script failed to load'));
                });
                return;
            }

            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(apiKey) + '&loading=async';
            script.async = true;
            script.defer = true;
            script.dataset.googleMapsLoader = 'for-sale';
            script.onload = function () {
                if (window.google && window.google.maps) {
                    resolve(window.google.maps);
                    return;
                }
                reject(new Error('Google Maps failed to initialize'));
            };
            script.onerror = function () {
                reject(new Error('Google Maps script failed to load'));
            };
            document.head.appendChild(script);
        });
    }

    function loadMapboxAssets() {
        if (window.mapboxgl && typeof window.mapboxgl.Map === 'function') {
            return Promise.resolve(window.mapboxgl);
        }

        return new Promise(function (resolve, reject) {
            var existingCss = document.querySelector('link[data-mapbox-loader="for-sale"]');
            if (!existingCss) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.css';
                link.dataset.mapboxLoader = 'for-sale';
                document.head.appendChild(link);
            }

            var existingScript = document.querySelector('script[data-mapbox-loader="for-sale"]');
            if (existingScript) {
                existingScript.addEventListener('load', function () {
                    if (window.mapboxgl && typeof window.mapboxgl.Map === 'function') {
                        resolve(window.mapboxgl);
                    } else {
                        reject(new Error('Mapbox GL failed to initialize'));
                    }
                }, { once: true });
                existingScript.addEventListener('error', function () {
                    reject(new Error('Mapbox GL failed to load'));
                }, { once: true });
                return;
            }

            var script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.js';
            script.async = true;
            script.defer = true;
            script.dataset.mapboxLoader = 'for-sale';
            script.onload = function () {
                if (window.mapboxgl && typeof window.mapboxgl.Map === 'function') {
                    resolve(window.mapboxgl);
                } else {
                    reject(new Error('Mapbox GL failed to initialize'));
                }
            };
            script.onerror = function () {
                reject(new Error('Mapbox GL failed to load'));
            };
            document.head.appendChild(script);
        });
    }

    function spreadOverlappingPoints(items) {
        var grouped = new Map();

        items.forEach(function (item) {
            var lat = Number(item.lat);
            var lng = Number(item.lng);
            var key = lat.toFixed(6) + ',' + lng.toFixed(6);

            if (!grouped.has(key)) {
                grouped.set(key, []);
            }

            grouped.get(key).push(item);
        });

        grouped.forEach(function (group) {
            if (group.length <= 1) {
                var first = group[0];
                first.displayLat = Number(first.lat);
                first.displayLng = Number(first.lng);
                return;
            }

            var radius = 0.00035;
            group.forEach(function (item, index) {
                var angle = ((Math.PI * 2) / group.length) * index;
                item.displayLat = Number(item.lat) + (Math.sin(angle) * radius);
                item.displayLng = Number(item.lng) + (Math.cos(angle) * radius);
            });
        });

        return items;
    }

    function parseRequestedMapCenter() {
        if (!centerHiddenInput || !centerHiddenInput.value) {
            return null;
        }

        var parts = String(centerHiddenInput.value).split(',').map(function (part) {
            return Number(part.trim());
        });
        if (parts.length !== 2 || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) {
            return null;
        }

        var lng = parts[0];
        var lat = parts[1];
        if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
            return null;
        }

        return { lat: lat, lng: lng };
    }

    function parseRequestedMapViewport() {
        if (!viewportHiddenInput || !viewportHiddenInput.value) {
            return null;
        }

        var parts = String(viewportHiddenInput.value).split(',').map(function (part) {
            return Number(part.trim());
        });
        if (parts.length !== 4 || parts.some(function (part) { return !Number.isFinite(part); })) {
            return null;
        }

        var north = parts[0];
        var east = parts[1];
        var south = parts[2];
        var west = parts[3];
        if (north < -90 || north > 90 || south < -90 || south > 90 || east < -180 || east > 180 || west < -180 || west > 180) {
            return null;
        }

        return {
            north: north,
            east: east,
            south: south,
            west: west,
        };
    }

    function parseRequestedMapZoom() {
        if (!zoomHiddenInput || !zoomHiddenInput.value) {
            return null;
        }

        var zoom = Math.round(Number(zoomHiddenInput.value));
        if (!Number.isFinite(zoom) || zoom < 1 || zoom > 22) {
            return null;
        }

        return zoom;
    }

    function applyGoogleRequestedViewport(map, mapsApi) {
        var viewport = parseRequestedMapViewport();
        if (!viewport) {
            return false;
        }

        var zoom = parseRequestedMapZoom();
        if (zoom !== null) {
            mapsApi.event.addListenerOnce(map, 'bounds_changed', function () {
                map.setZoom(zoom);
            });
        }

        var bounds = new mapsApi.LatLngBounds(
            { lat: viewport.south, lng: viewport.west },
            { lat: viewport.north, lng: viewport.east }
        );
        map.fitBounds(bounds, 64);

        return true;
    }

    function applyGoogleRequestedCenter(map) {
        var center = parseRequestedMapCenter();
        if (!center) {
            return false;
        }

        map.setCenter(center);
        var zoom = parseRequestedMapZoom();
        if (zoom !== null) {
            map.setZoom(zoom);
        }
        return true;
    }

    function applyLeafletRequestedViewport(map) {
        var viewport = parseRequestedMapViewport();
        if (!viewport) {
            return false;
        }

        map.fitBounds(
            [
                [viewport.south, viewport.west],
                [viewport.north, viewport.east],
            ],
            { padding: [64, 64] }
        );

        var zoom = parseRequestedMapZoom();
        if (zoom !== null) {
            map.setZoom(zoom);
        }

        return true;
    }

    function applyLeafletRequestedCenter(map) {
        var center = parseRequestedMapCenter();
        if (!center) {
            return false;
        }

        map.setView([center.lat, center.lng], parseRequestedMapZoom() || map.getZoom());
        return true;
    }

    function applyMapboxRequestedViewport(map) {
        var viewport = parseRequestedMapViewport();
        if (!viewport || !map || typeof map.fitBounds !== 'function') {
            return false;
        }

        map.fitBounds(
            [
                [viewport.west, viewport.south],
                [viewport.east, viewport.north],
            ],
            { padding: 64 }
        );

        var zoom = parseRequestedMapZoom();
        if (zoom !== null && typeof map.setZoom === 'function') {
            map.setZoom(zoom);
        }

        return true;
    }

    function applyMapboxRequestedCenter(map) {
        var center = parseRequestedMapCenter();
        if (!center || !map || typeof map.setCenter !== 'function') {
            return false;
        }

        map.setCenter([center.lng, center.lat]);
        var zoom = parseRequestedMapZoom();
        if (zoom !== null && typeof map.setZoom === 'function') {
            map.setZoom(zoom);
        }
        return true;
    }

    async function initMapboxMap(points) {
        var mapboxApi = await loadMapboxAssets();
        mapElement.innerHTML = '';
        mapMarkerRegistry = Object.create(null);
        activeMapMarkerId = '';
        closeMapPopup();

        mapboxApi.accessToken = mapboxAccessToken;
        window.mapboxgl.accessToken = mapboxAccessToken;
        var map = new mapboxApi.Map({
            container: mapElement,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [Number(points[0].lng), Number(points[0].lat)],
            zoom: 12,
            attributionControl: true,
        });

        map.addControl(new mapboxApi.NavigationControl({
            showCompass: false,
        }), 'top-right');

        var bounds = new mapboxApi.LngLatBounds();

        points.forEach(function (item) {
            var coords = getMapPointLatLng(item);
            bounds.extend([coords.lng, coords.lat]);
        });

        map.on('load', function () {
            if (applyMapboxRequestedViewport(map)) {
                renderMapboxMarkerBatches(mapboxApi, map, points);
                return;
            }

            if (applyMapboxRequestedCenter(map)) {
                renderMapboxMarkerBatches(mapboxApi, map, points);
                return;
            }

            if (points.length === 1) {
                map.setCenter(bounds.getCenter());
                map.setZoom(12);
                renderMapboxMarkerBatches(mapboxApi, map, points);
                return;
            }

            map.fitBounds(bounds, { padding: 64 });
            renderMapboxMarkerBatches(mapboxApi, map, points);
        });

        map.on('moveend', function () {
            if (suppressMapboxMoveRender) {
                return;
            }
            renderMapboxMarkerBatches(mapboxApi, map, points);
        });

        map.on('click', function () {
            clearMapboxSpiderMarkers();
            closeMapPopup();
        });
    }

    async function initGoogleMap(points) {
        var mapsApi = await loadGoogleMapsApi(googleMapsApiKey);
        mapElement.innerHTML = '';
        mapMarkerRegistry = Object.create(null);
        activeMapMarkerId = '';
        var map = new mapsApi.Map(mapElement, {
            center: { lat: Number(points[0].lat), lng: Number(points[0].lng) },
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            rotateControl: false,
            scaleControl: false,
            gestureHandling: 'greedy',
        });
        var infoWindow = new mapsApi.InfoWindow();

        var bounds = new mapsApi.LatLngBounds();

        points.forEach(function (item, index) {
            var markerLat = Number.isFinite(Number(item.displayLat)) ? Number(item.displayLat) : Number(item.lat);
            var markerLng = Number.isFinite(Number(item.displayLng)) ? Number(item.displayLng) : Number(item.lng);
            var markerPosition = { lat: markerLat, lng: markerLng };
            var marker = new mapsApi.Marker({
                map: map,
                position: markerPosition,
                icon: buildGoogleMapPinIcon(mapsApi, false),
            });
            var popupHtml = listingPopupHtml(item);

            registerMapMarker(item.id, {
                provider: 'google',
                marker: marker,
                mapsApi: mapsApi,
                labelText: '',
            });

            marker.addListener('click', function () {
                infoWindow.setContent(popupHtml);
                infoWindow.open({
                    anchor: marker,
                    map: map,
                    shouldFocus: false,
                });
                focusPropertyCard(item.id);
            });

            bounds.extend(markerPosition);
        });

        if (applyGoogleRequestedViewport(map, mapsApi)) {
            return;
        }

        if (applyGoogleRequestedCenter(map)) {
            return;
        }

        if (points.length === 1) {
            map.setCenter(bounds.getCenter());
            map.setZoom(12);
        } else {
            map.fitBounds(bounds, 64);
        }
    }

    async function initLeafletMap(points) {
        var leafletApi = await loadLeafletAssets();
        mapElement.innerHTML = '';
        mapMarkerRegistry = Object.create(null);
        activeMapMarkerId = '';

        var map = leafletApi.map(mapElement, {
            zoomControl: true,
            attributionControl: true,
        }).setView([Number(points[0].lat), Number(points[0].lng)], 12);

        leafletApi.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        var markerBounds = [];

        points.forEach(function (item, index) {
            var markerLat = Number.isFinite(Number(item.displayLat)) ? Number(item.displayLat) : Number(item.lat);
            var markerLng = Number.isFinite(Number(item.displayLng)) ? Number(item.displayLng) : Number(item.lng);
            var markerLabel = String(index + 1);
            var marker = leafletApi.marker([markerLat, markerLng], {
                icon: buildLeafletMapPinIcon(leafletApi, markerLabel, false),
            }).addTo(map);

            registerMapMarker(item.id, {
                provider: 'leaflet',
                marker: marker,
                leafletApi: leafletApi,
                labelText: markerLabel,
            });

            marker.bindPopup(listingPopupHtml(item), {
                autoPan: true,
                closeButton: false,
                minWidth: 180,
            });

            marker.on('click', function () {
                focusPropertyCard(item.id);
            });

            markerBounds.push([markerLat, markerLng]);
        });

        if (applyLeafletRequestedViewport(map)) {
            return;
        }

        if (applyLeafletRequestedCenter(map)) {
            return;
        }

        if (markerBounds.length === 1) {
            map.setView(markerBounds[0], 12);
            return;
        }

        map.fitBounds(markerBounds, { padding: [64, 64] });
    }

    async function initMap() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            return;
        }

        if (!mapElement) {
            showMapFallback();
            return;
        }

        var points = (listings || []).filter(function (item) {
            return Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng));
        });
        spreadOverlappingPoints(points);

        if (points.length === 0) {
            showMapFallback();
            return;
        }

        hideMapFallback();

        var usedMapbox = false;
        if (mapboxAccessToken) {
            try {
                await initMapboxMap(points);
                usedMapbox = true;
            } catch (_mapboxError) {
                usedMapbox = false;
            }
        }

        if (usedMapbox) {
            return;
        }

        var usedGoogle = false;
        if (googleMapsApiKey) {
            try {
                await initGoogleMap(points);
                usedGoogle = true;
            } catch (_googleError) {
                usedGoogle = false;
            }
        }

        if (usedGoogle) {
            return;
        }

        try {
            showMapFallback();
        } catch (_fallbackError) {
            showMapFallback();
        }
    }

    initMap();
})();

/* === Auth JS === */
(() => {
    const endpoints = {
        checkEmail: "\/auth\/check-email",
        register: "\/auth\/register",
        validateCode: "\/auth\/validate-code",
        login: "\/auth\/login",
        loginSocial: "\/auth\/login-social",
    };

    const dashboardUrl = '/dashboard/listings';
    const postLoginRedirectStorageKey = 'beycome.auth.post-login-redirect';
    const googleClientId = "530911965663-uvkk1fn07j5e89qqpf29lf16p0sq48l2.apps.googleusercontent.com";
    const facebookAppId = "227734868129960";

    const feedbackEl = document.getElementById('auth-feedback');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authModalSubtitle = document.getElementById('auth-modal-subtitle');
    const authModeTabs = document.getElementById('auth-mode-tabs');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    const panelLogin = document.getElementById('panel-login');
    const panelRegister = document.getElementById('panel-register');
    const panelOtp = document.getElementById('panel-otp');
    const panelPassword = document.getElementById('panel-password');

    const loginEmailInput = document.getElementById('login-email');
    const registerEmailInput = document.getElementById('register-email');
    const registerNameInput = document.getElementById('register-name');
    const passwordEmailInput = document.getElementById('password-email');
    const otpEmailTarget = document.getElementById('otp-email');
    const otpPhoneTarget = document.getElementById('otp-phone');
    const otpPhoneLine = document.getElementById('otp-phone-line');
    const registerSmsConsent = document.getElementById('register-sms-consent');

    const loginEmailForm = document.getElementById('login-email-form');
    const registerForm = document.getElementById('register-form');
    const otpForm = document.getElementById('otp-form');
    const passwordForm = document.getElementById('password-form');

    const resendCodeBtn = document.getElementById('resend-code-btn');
    const passwordModeBtn = document.getElementById('password-mode-btn');
    const facebookSigninButton = document.getElementById('facebook-signin-button');
    const googleSigninShell = document.getElementById('google-signin-shell');
    const googleSigninWrap = document.getElementById('google-signin-wrap');
    const googleSigninFallback = document.getElementById('google-signin-fallback');
    const authModal = document.getElementById('auth-modal');
    const authModalBackdrop = document.getElementById('auth-modal-backdrop');
    const authModalShell = document.getElementById('auth-modal-shell');
    const authModalPanel = document.getElementById('auth-modal-panel');
    const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const isLoginRoute = normalizedPath === '/login';

    const otpInputs = Array.from(document.querySelectorAll('.otp-input'));

    if (
        !feedbackEl
        || !authModalTitle
        || !authModalSubtitle
        || !authModeTabs
        || !tabLogin
        || !tabRegister
        || !panelLogin
        || !panelRegister
        || !panelOtp
        || !panelPassword
        || !loginEmailInput
        || !registerEmailInput
        || !registerNameInput
        || !passwordEmailInput
        || !otpEmailTarget
        || !otpPhoneTarget
        || !otpPhoneLine
        || !registerSmsConsent
        || !loginEmailForm
        || !registerForm
        || !otpForm
        || !passwordForm
        || !resendCodeBtn
        || !passwordModeBtn
        || !facebookSigninButton
        || !googleSigninShell
        || !googleSigninWrap
        || !googleSigninFallback
        || !authModal
        || !authModalBackdrop
        || !authModalShell
        || !authModalPanel
    ) {
        console.error('auth modal init failed: missing required DOM nodes');
        return;
    }

    const state = {
        mode: 'login',
        email: '',
        phone: '',
        onSuccess: null,
        context: '',
        codeOnly: false,
    };

    function csrfTokenValue(form = null) {
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (typeof metaToken === 'string' && metaToken !== '') {
            return metaToken;
        }

        const formToken = form?.querySelector('input[name="_token"]')?.value;
        if (typeof formToken === 'string' && formToken !== '') {
            return formToken;
        }

        return '';
    }

    function normalizedRoutePath(pathname) {
        return String(pathname || '').replace(/\/+$/, '') || '/';
    }

    function isAuthRoutePath(pathname) {
        const normalized = normalizedRoutePath(pathname);
        return normalized === '/login' || normalized === '/register';
    }

    function toSafeRedirectPath(value) {
        if (typeof value !== 'string') {
            return '';
        }

        const trimmed = value.trim();
        if (trimmed === '') {
            return '';
        }

        try {
            const parsed = new URL(trimmed, window.location.origin);
            if (parsed.origin !== window.location.origin) {
                return '';
            }

            if (isAuthRoutePath(parsed.pathname)) {
                return '';
            }

            return `${parsed.pathname}${parsed.search}${parsed.hash}`;
        } catch (_error) {
            return '';
        }
    }

    function setPostLoginRedirect(value) {
        const redirectPath = toSafeRedirectPath(value);
        if (redirectPath === '') {
            return;
        }

        try {
            window.sessionStorage.setItem(postLoginRedirectStorageKey, redirectPath);
        } catch (_error) {}
    }

    function peekPostLoginRedirect() {
        try {
            return toSafeRedirectPath(window.sessionStorage.getItem(postLoginRedirectStorageKey) || '');
        } catch (_error) {
            return '';
        }
    }

    function consumePostLoginRedirect() {
        try {
            const storedValue = window.sessionStorage.getItem(postLoginRedirectStorageKey);
            window.sessionStorage.removeItem(postLoginRedirectStorageKey);
            return toSafeRedirectPath(storedValue || '');
        } catch (_error) {
            return '';
        }
    }

    function redirectFromUrlValue(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            return '';
        }

        try {
            const parsed = new URL(value, window.location.origin);
            return toSafeRedirectPath(parsed.searchParams.get('redirect') || '');
        } catch (_error) {
            return '';
        }
    }

    function resolvePostLoginRedirect(responseData) {
        const responseCandidates = [
            responseData?.data?.redirect,
            responseData?.data?.redirect_to,
            responseData?.data?.redirect_url,
            responseData?.redirect,
            responseData?.redirect_to,
            responseData?.redirect_url,
        ];

        for (const candidate of responseCandidates) {
            const safeResponseRedirect = toSafeRedirectPath(candidate);
            if (safeResponseRedirect !== '') {
                consumePostLoginRedirect();
                return safeResponseRedirect;
            }
        }

        const queryRedirect = toSafeRedirectPath(new URLSearchParams(window.location.search).get('redirect') || '');
        if (queryRedirect !== '') {
            consumePostLoginRedirect();
            return queryRedirect;
        }

        const storedRedirect = consumePostLoginRedirect();
        if (storedRedirect !== '') {
            return storedRedirect;
        }

        return dashboardUrl;
    }

    function isListingContextPage() {
        if (document.getElementById('detail-endpoints')) {
            return true;
        }

        return document.querySelector('.fs-shell') !== null;
    }

    function applyAuthPrefill(prefill = {}) {
        const email = typeof prefill?.email === 'string' ? prefill.email.trim() : '';
        const name = typeof prefill?.name === 'string' ? prefill.name.trim() : '';
        const phone = typeof prefill?.phone === 'string' ? prefill.phone.trim() : '';

        if (email !== '') {
            loginEmailInput.value = email;
            registerEmailInput.value = email;
        }
        if (name !== '') {
            registerNameInput.value = name;
        }
        if (phone !== '') {
            const registerPhoneInput = document.getElementById('register-phone');
            if (registerPhoneInput) {
                registerPhoneInput.value = phone;
            }
        }
    }

    function openAuthModal(mode = 'login', options = {}) {
        state.onSuccess = typeof options?.onSuccess === 'function' ? options.onSuccess : null;
        state.context = typeof options?.context === 'string' ? options.context : '';
        state.codeOnly = false;

        if (!state.onSuccess) {
            const explicitRedirect = toSafeRedirectPath(options?.redirectTo || '');
            if (explicitRedirect !== '') {
                setPostLoginRedirect(explicitRedirect);
            } else if (isListingContextPage()) {
                setPostLoginRedirect(window.location.href);
            }
        }

        setMode(mode);
        applyAuthPrefill(options?.prefill || {});
        authModal.classList.remove('hidden');
        authModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    }

    function openAuthOtpModal(email, phone = null, options = {}) {
        const normalizedEmail = typeof email === 'string' ? email.trim() : '';
        if (normalizedEmail === '') {
            openAuthModal('login', options);
            return;
        }

        state.onSuccess = typeof options?.onSuccess === 'function' ? options.onSuccess : null;
        state.context = typeof options?.context === 'string' ? options.context : '';
        state.codeOnly = true;
        clearFeedback();
        applyAuthPrefill(options?.prefill || {});
        authModalTitle.textContent = options?.title || 'Confirm Your Email';
        authModalSubtitle.textContent = options?.subtitle || 'Enter the code we just sent to continue saving your listing.';
        authModalSubtitle.classList.remove('hidden');
        authModeTabs.classList.add('hidden');
        passwordModeBtn.classList.add('hidden');
        showOtpPanel(normalizedEmail, phone);
        authModal.classList.remove('hidden');
        authModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    }

    function closeAuthModal(options = {}) {
        authModal.classList.add('hidden');
        authModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');

        if (options.clearAuthCallback !== false) {
            state.onSuccess = null;
            state.context = '';
        }

        if (isLoginRoute && options.preventRedirect !== true) {
            window.location.assign('/');
        }
    }

    function bindAuthOpeners() {
        document.querySelectorAll('[data-auth-open]').forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                if (event.defaultPrevented) {
                    return;
                }

                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return;
                }

                event.preventDefault();
                const triggerHref = trigger.getAttribute('href') || '';
                const redirectFromHref = redirectFromUrlValue(triggerHref);
                openAuthModal(trigger.dataset.authMode || 'login', {
                    redirectTo: trigger.dataset.authRedirect || redirectFromHref,
                });
            });
        });
    }

    function showFeedback(message, type = 'error') {
        feedbackEl.textContent = message;
        feedbackEl.classList.remove('hidden', 'border-red-200', 'bg-red-50', 'text-red-700', 'border-emerald-200', 'bg-emerald-50', 'text-emerald-700');

        if (type === 'success') {
            feedbackEl.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-700');
            return;
        }

        feedbackEl.classList.add('border-red-200', 'bg-red-50', 'text-red-700');
    }

    function clearFeedback() {
        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
    }

    function setMode(mode) {
        state.mode = mode;
        state.codeOnly = false;
        clearFeedback();
        hideOtpAndPasswordPanels();

        const isLogin = mode === 'login';
        authModalTitle.textContent = isLogin ? 'Welcome Back to Beycome' : 'Welcome to Beycome';
        authModalSubtitle.textContent = 'Create an Account to Save your Listing';
        authModalSubtitle.classList.toggle('hidden', isLogin || state.context !== 'submit-property-save');
        authModeTabs.classList.remove('hidden');
        passwordModeBtn.classList.remove('hidden');
        panelLogin.classList.toggle('hidden', !isLogin);
        panelRegister.classList.toggle('hidden', isLogin);

        tabLogin.classList.toggle('bg-white', isLogin);
        tabLogin.classList.toggle('shadow-sm', isLogin);
        tabLogin.classList.toggle('text-gunmetal', isLogin);
        tabLogin.classList.toggle('text-gunmetal-50', !isLogin);

        tabRegister.classList.toggle('bg-white', !isLogin);
        tabRegister.classList.toggle('shadow-sm', !isLogin);
        tabRegister.classList.toggle('text-gunmetal', !isLogin);
        tabRegister.classList.toggle('text-gunmetal-50', isLogin);
    }

    function hideOtpAndPasswordPanels() {
        panelOtp.classList.add('hidden');
        panelPassword.classList.add('hidden');
    }

    function showOtpPanel(email, phone = null) {
        state.email = email;
        state.phone = phone || '';

        panelLogin.classList.add('hidden');
        panelRegister.classList.add('hidden');
        panelPassword.classList.add('hidden');
        panelOtp.classList.remove('hidden');
        passwordModeBtn.classList.toggle('hidden', Boolean(state.codeOnly));

        otpEmailTarget.textContent = email;

        if (phone) {
            otpPhoneTarget.textContent = phone;
            otpPhoneLine.classList.remove('hidden');
        } else {
            otpPhoneLine.classList.add('hidden');
            otpPhoneTarget.textContent = '';
        }

        otpInputs.forEach((input) => {
            input.value = '';
        });

        otpInputs[0]?.focus();
    }

    function showPasswordPanel(email) {
        state.email = email;
        panelLogin.classList.add('hidden');
        panelRegister.classList.add('hidden');
        panelOtp.classList.add('hidden');
        panelPassword.classList.remove('hidden');
        passwordEmailInput.value = email;
        document.getElementById('password-value')?.focus();
    }

    function isMissingAccountMessage(message) {
        return typeof message === 'string' && /(?:email not found|no account found)/i.test(message.trim());
    }

    function openRegisterWithEmail(email) {
        setMode('register');
        registerEmailInput.value = email;
        registerNameInput.focus();
    }

    function currentRememberPreference() {
        return Boolean(document.getElementById('otp-remember')?.checked || document.getElementById('password-remember')?.checked);
    }

    function otpCodeValue() {
        return otpInputs.map((input) => input.value).join('');
    }

    function tryAutoSubmitOtp() {
        const code = otpCodeValue();
        if (!/^[0-9]{6}$/.test(code)) {
            return;
        }

        const submitButton = otpForm?.querySelector('button[type="submit"]');
        if (submitButton?.disabled) {
            return;
        }

        if (typeof otpForm?.requestSubmit === 'function') {
            otpForm.requestSubmit();
            return;
        }

        otpForm?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    function setLoading(form, loading) {
        const submitButton = form?.querySelector('button[type="submit"]');
        if (!submitButton) {
            return;
        }

        submitButton.disabled = loading;
        submitButton.classList.toggle('opacity-70', loading);
        submitButton.classList.toggle('cursor-not-allowed', loading);
    }

    async function postForm(url, payload, form = null) {
        const body = new URLSearchParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                return;
            }

            body.append(key, String(value));
        });

        if (!body.has('redirect')) {
            const storedRedirect = peekPostLoginRedirect();
            if (storedRedirect !== '') {
                body.append('redirect', storedRedirect);
            } else {
                const queryRedirect = toSafeRedirectPath(new URLSearchParams(window.location.search).get('redirect') || '');
                if (queryRedirect !== '') {
                    body.append('redirect', queryRedirect);
                }
            }
        }

        const csrfToken = csrfTokenValue(form);
        if (csrfToken !== '' && !body.has('_token')) {
            body.append('_token', csrfToken);
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        if (csrfToken !== '') {
            headers['X-CSRF-TOKEN'] = csrfToken;
        }

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers,
            body: body.toString(),
        });

        let data = {};

        try {
            data = await response.json();
        } catch (_error) {
            data = {};
        }

        return {
            ok: response.ok,
            status: response.status,
            data,
        };
    }

    async function completeLogin(responseData) {
        const tokenCandidates = [
            responseData?.data?.access_token,
            responseData?.data?.token,
            responseData?.data?.Authorization,
            responseData?.data?.authorization,
            responseData?.data?.data?.access_token,
            responseData?.data?.data?.token,
            responseData?.data?.data?.Authorization,
            responseData?.data?.data?.authorization,
            responseData?.access_token,
            responseData?.token,
            responseData?.Authorization,
            responseData?.authorization,
        ];

        for (const tokenCandidate of tokenCandidates) {
            if (typeof tokenCandidate !== 'string') {
                continue;
            }

            const normalizedToken = tokenCandidate.trim().replace(/^Bearer\s+/i, '');
            if (normalizedToken === '') {
                continue;
            }

            const maxAgeSeconds = 5 * 365 * 24 * 60 * 60;
            const secureDirective = window.location.protocol === 'https:' ? '; Secure' : '';
            document.cookie = `Authorization=${encodeURIComponent(normalizedToken)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secureDirective}`;
            window.beycomeAuthorizationToken = normalizedToken;
            window.dispatchEvent(new CustomEvent('beycome:auth-token', {
                detail: { token: normalizedToken },
            }));
            break;
        }

        if (typeof state.onSuccess === 'function') {
            const callback = state.onSuccess;
            state.onSuccess = null;
            closeAuthModal({ clearAuthCallback: false, preventRedirect: true });
            await callback(responseData);
            return;
        }

        window.location.assign(resolvePostLoginRedirect(responseData));
    }

    function extractErrorMessage(data) {
        if (typeof data?.message === 'string' && data.message !== '') {
            const normalized = data.message.trim();
            if (/^unathorized\.?$/i.test(normalized) || /^unauthorized\.?$/i.test(normalized)) {
                return 'Incorrect email or password';
            }

            return normalized;
        }

        if (Array.isArray(data?.errors) && data.errors.length > 0 && typeof data.errors[0]?.message === 'string') {
            const normalized = data.errors[0].message.trim();
            if (/^unathorized\.?$/i.test(normalized) || /^unauthorized\.?$/i.test(normalized)) {
                return 'Incorrect email or password';
            }

            return normalized;
        }

        return 'Request failed. Please try again.';
    }

    loginEmailForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearFeedback();

        const email = loginEmailInput.value.trim();
        if (email === '') {
            showFeedback('Email is required.');
            return;
        }

        setLoading(loginEmailForm, true);

        try {
            const result = await postForm(endpoints.checkEmail, { email }, loginEmailForm);

            if (!result.ok || result.data?.success !== true) {
                const message = extractErrorMessage(result.data);
                if (result.status === 404 && isMissingAccountMessage(message)) {
                    openRegisterWithEmail(email);
                    return;
                }

                showFeedback(message);
                return;
            }

            showOtpPanel(email, result.data?.data?.phone || null);
            showFeedback('Code sent. Check your email and SMS if enabled.', 'success');
        } catch (_error) {
            showFeedback('Unable to send login code right now. Please try again.');
        } finally {
            setLoading(loginEmailForm, false);
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearFeedback();

        const formData = new FormData(registerForm);
        const email = String(formData.get('email') || '').trim();
        const firstname = String(formData.get('firstname') || '').trim();
        const companyName = String(formData.get('company_name') || '').trim();
        const phone = String(formData.get('phone') || '').trim();
        const smsConsent = formData.get('sms_consent') === '1';

        if (!email || !firstname || !phone) {
            showFeedback('Email, full name, and phone are required.');
            return;
        }

        if (!smsConsent) {
            showFeedback('Please check the SMS consent box to continue.');
            return;
        }

        setLoading(registerForm, true);

        try {
            const result = await postForm(endpoints.register, {
                email,
                firstname,
                company_name: companyName,
                phone,
                is_owner: state.context === 'submit-property-save' ? 1 : 0,
                sms_consent: 1,
            }, registerForm);

            if (!result.ok || result.data?.success !== true) {
                showFeedback(extractErrorMessage(result.data));
                return;
            }

            showOtpPanel(email, result.data?.data?.phone || null);
            showFeedback('Account created and code sent.', 'success');
        } catch (_error) {
            showFeedback('Unable to create account right now. Please try again.');
        } finally {
            setLoading(registerForm, false);
        }
    });

    otpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearFeedback();

        const code = otpCodeValue();
        if (!/^[0-9]{6}$/.test(code)) {
            showFeedback('Enter the 6-digit code.');
            return;
        }

        setLoading(otpForm, true);

        try {
            const result = await postForm(endpoints.validateCode, {
                email: state.email,
                code,
                remember: currentRememberPreference() ? 1 : 0,
            }, otpForm);

            if (!result.ok || result.data?.data?.success !== true) {
                showFeedback(extractErrorMessage(result.data));
                return;
            }

            await completeLogin(result.data);
        } catch (_error) {
            showFeedback('Code validation failed. Please try again.');
        } finally {
            setLoading(otpForm, false);
        }
    });

    resendCodeBtn.addEventListener('click', async () => {
        clearFeedback();

        if (!state.email) {
            showFeedback('Enter your email first.');
            return;
        }

        resendCodeBtn.disabled = true;

        try {
            const result = await postForm(endpoints.checkEmail, { email: state.email }, otpForm);

            if (!result.ok || result.data?.success !== true) {
                showFeedback(extractErrorMessage(result.data));
                return;
            }

            const phone = result.data?.data?.phone || state.phone || null;
            showOtpPanel(state.email, phone);
            showFeedback('A new code has been sent.', 'success');
        } catch (_error) {
            showFeedback('Unable to resend code right now.');
        } finally {
            setTimeout(() => {
                resendCodeBtn.disabled = false;
            }, 1500);
        }
    });

    passwordModeBtn.addEventListener('click', () => {
        clearFeedback();
        showPasswordPanel(state.email || loginEmailInput.value.trim());
    });

    passwordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearFeedback();

        const email = passwordEmailInput.value.trim();
        const password = String(document.getElementById('password-value')?.value || '');

        if (!email || !password) {
            showFeedback('Email and password are required.');
            return;
        }

        setLoading(passwordForm, true);

        try {
            const result = await postForm(endpoints.login, {
                email,
                password,
                remember: currentRememberPreference() ? 1 : 0,
            }, passwordForm);

            if (!result.ok || result.data?.data?.success !== true) {
                showFeedback(extractErrorMessage(result.data));
                return;
            }

            await completeLogin(result.data);
        } catch (_error) {
            showFeedback('Password login failed. Please try again.');
        } finally {
            setLoading(passwordForm, false);
        }
    });

    function fillOtpInputs(startIndex, rawValue) {
        const digits = String(rawValue || '').replace(/\D/g, '');
        if (!digits) {
            return;
        }

        let cursor = startIndex;

        for (const digit of digits) {
            if (cursor >= otpInputs.length) {
                break;
            }

            otpInputs[cursor].value = digit;
            cursor += 1;
        }

        if (cursor < otpInputs.length) {
            otpInputs[cursor].focus();
        } else {
            otpInputs[otpInputs.length - 1]?.focus();
            tryAutoSubmitOtp();
        }
    }

    function handleOtpInput(index, rawValue) {
        const digits = String(rawValue || '').replace(/\D/g, '');
        const currentInput = otpInputs[index];

        if (!digits) {
            currentInput.value = '';
            return;
        }

        if (digits.length > 1) {
            fillOtpInputs(index, digits);
            return;
        }

        currentInput.value = digits;

        if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
            return;
        }

        tryAutoSubmitOtp();
    }

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (event) => {
            handleOtpInput(index, event.target.value);
        });

        input.addEventListener('change', (event) => {
            handleOtpInput(index, event.target.value);
        });

        input.addEventListener('paste', (event) => {
            event.preventDefault();

            const pasted = event.clipboardData?.getData('text') || '';
            fillOtpInputs(index, pasted);
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && !input.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    tabLogin.addEventListener('click', () => setMode('login'));
    tabRegister.addEventListener('click', () => setMode('register'));

    async function submitSocialLogin(payload) {
        clearFeedback();

        const result = await postForm(endpoints.loginSocial, payload, loginEmailForm);

        if (!result.ok || result.data?.data?.success !== true) {
            showFeedback(extractErrorMessage(result.data));
            return;
        }

        await completeLogin(result.data);
    }

    function decodeJwtClaims(token) {
        if (!token || typeof token !== 'string') {
            return null;
        }

        const parts = token.split('.');
        if (parts.length < 2) {
            return null;
        }

        try {
            const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const padded = base64 + '='.repeat((4 - (base64.length % 4 || 4)) % 4);
            const json = atob(padded);

            return JSON.parse(json);
        } catch (_error) {
            return null;
        }
    }

    function initGoogleSignIn() {
        if (!googleClientId || !window.google || !google.accounts || !google.accounts.id) {
            return;
        }

        google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (response) => {
                if (!response?.credential) {
                    showFeedback('Google login was cancelled.');
                    return;
                }

                const claims = decodeJwtClaims(response.credential);
                const providerId = String(claims?.sub || '').trim();
                const email = String(claims?.email || '').trim();

                if (!providerId || !email) {
                    showFeedback('Unable to verify your Google account. Please try again.');
                    return;
                }

                await submitSocialLogin({
                    type: 'google',
                    id: providerId,
                    social_id: providerId,
                    email,
                    first_name: String(claims?.given_name || '').trim(),
                    last_name: String(claims?.family_name || '').trim(),
                    id_token: response.credential,
                    remember: currentRememberPreference() ? 1 : 0,
                });
            },
        });

        google.accounts.id.renderButton(googleSigninWrap, {
            type: 'icon',
            shape: 'circle',
            theme: 'outline',
            size: 'large',
            logo_alignment: 'center',
        });

        googleSigninShell.classList.remove('hidden');
        googleSigninShell.classList.add('inline-flex');
        window.setTimeout(() => {
            if (googleSigninWrap.querySelector('iframe')) {
                googleSigninFallback.classList.add('hidden');
            } else {
                googleSigninFallback.classList.remove('hidden');
            }
        }, 250);
    }

    window.fbAsyncInit = function() {
        if (!facebookAppId || !window.FB) {
            facebookSigninButton.disabled = true;
            facebookSigninButton.classList.add('opacity-60', 'cursor-not-allowed');
            return;
        }

        FB.init({
            appId: facebookAppId,
            cookie: true,
            xfbml: false,
            version: 'v20.0',
        });
    };

    facebookSigninButton.addEventListener('click', () => {
        if (!window.FB) {
            showFeedback('Facebook login is currently unavailable.');
            return;
        }

        FB.login((loginResponse) => {
            if (loginResponse?.status !== 'connected') {
                showFeedback('Facebook login was cancelled.');
                return;
            }

            FB.api('/me', { fields: 'id,first_name,last_name,email' }, async (profile) => {
                if (profile?.error || !profile?.email || !profile?.id) {
                    showFeedback('Unable to read Facebook profile email. Please use another login method.');
                    return;
                }

                await submitSocialLogin({
                    type: 'facebook',
                    id: profile.id,
                    access_token: loginResponse.authResponse?.accessToken || '',
                    social_id: profile.id,
                    email: profile.email,
                    first_name: profile.first_name || '',
                    last_name: profile.last_name || '',
                    remember: currentRememberPreference() ? 1 : 0,
                });
            });
        }, { scope: 'public_profile,email' });
    });

    if (window.google && window.google.accounts && window.google.accounts.id) {
        initGoogleSignIn();
    } else {
        const googleInitInterval = setInterval(() => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                clearInterval(googleInitInterval);
                initGoogleSignIn();
            }
        }, 250);

        setTimeout(() => clearInterval(googleInitInterval), 6000);
    }

    authModalBackdrop.addEventListener('click', closeAuthModal);
    authModalShell.addEventListener('click', (event) => {
        if (event.target === authModalShell) {
            closeAuthModal();
        }
    });

    authModal.addEventListener('click', (event) => {
        if (event.target === authModal || (!authModalPanel.contains(event.target) && event.target !== authModalBackdrop)) {
            closeAuthModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !authModal.classList.contains('hidden')) {
            closeAuthModal();
        }
    });

    window.addEventListener('auth-modal:open', (event) => {
        openAuthModal(event.detail?.mode || 'login', event.detail || {});
    });

    window.addEventListener('auth-modal:open-otp', (event) => {
        openAuthOtpModal(event.detail?.email || '', event.detail?.phone || null, event.detail || {});
    });

    bindAuthOpeners();
    setMode('login');

    const searchParams = new URLSearchParams(window.location.search);
    if (isLoginRoute || searchParams.get('auth') === 'login' || window.location.hash === '#login') {
        openAuthModal('login');
    }

    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.openAuthOtpModal = openAuthOtpModal;
})();

/* === Toolbar JS === */
/* ── Bey toolbar dropdowns ── */
(function() {
    var pillBtns = {
        'bey-type-btn': 'bey-type-dd',
        'bey-price-btn': 'bey-price-dd',
        'bey-bed-btn': 'bey-bed-dd',
        'bey-ht-btn': 'bey-ht-dd',
    };

    function positionDropdown(btn, dd) {
        var r = btn.getBoundingClientRect();
        dd.style.top = (r.bottom + 6) + 'px';
        dd.style.left = r.left + 'px';
    }

    Object.entries(pillBtns).forEach(function([btnId, ddId]) {
        var btn = document.getElementById(btnId);
        var dd = document.getElementById(ddId);
        if (!btn || !dd) return;
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = dd.classList.contains('open');
            document.querySelectorAll('.bey-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
            if (!isOpen) {
                positionDropdown(btn, dd);
                dd.classList.add('open');
            }
        });
    });

    /* Done buttons */
    document.querySelectorAll('.bey-dd-done').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.bey-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
        });
    });

    /* Close on outside click */
    document.addEventListener('click', function() {
        document.querySelectorAll('.bey-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
    });
    document.querySelectorAll('.bey-dropdown').forEach(function(dd) {
        dd.addEventListener('click', function(e) { e.stopPropagation(); });
    });

    /* Sort dropdown */
    (function() {
        var sortBtn = document.getElementById('fs-sort-btn');
        var sortDd  = document.getElementById('fs-sort-dd');
        var sortSel = document.getElementById('fs-sort-inline-select');
        var sortLabel = document.getElementById('fs-sort-label');
        if (!sortBtn || !sortDd) return;

        sortBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = sortDd.classList.contains('open');
            document.querySelectorAll('.bey-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
            if (!isOpen) {
                var r = sortBtn.getBoundingClientRect();
                sortDd.style.top = (r.bottom + 6) + 'px';
                sortDd.style.left = 'auto';
                sortDd.style.right = (window.innerWidth - r.right) + 'px';
                sortDd.classList.add('open');
            }
        });
        sortDd.addEventListener('click', function(e) { e.stopPropagation(); });

        document.querySelectorAll('.fs-sort-option').forEach(function(opt) {
            opt.addEventListener('click', function() {
                var val = opt.getAttribute('data-val');
                var label = opt.textContent.trim();
                if (sortLabel) sortLabel.textContent = label;
                if (sortSel) {
                    sortSel.value = val;
                    sortSel.dispatchEvent(new Event('change'));
                }
                document.querySelectorAll('.fs-sort-option').forEach(function(o) { o.classList.remove('is-active'); });
                opt.classList.add('is-active');
                sortDd.classList.remove('open');
            });
        });
    })();

    /* Bed/bath chips */
    document.querySelectorAll('#bey-bed-chips .bey-chip, #bey-bath-chips .bey-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            var row = chip.closest('.bey-chip-row');
            row.querySelectorAll('.bey-chip').forEach(function(c) { c.classList.remove('bey-chip--active'); });
            chip.classList.add('bey-chip--active');
            /* update bed label */
            var bedVal = document.querySelector('#bey-bed-chips .bey-chip--active')?.dataset.val || '';
            var bathVal = document.querySelector('#bey-bath-chips .bey-chip--active')?.dataset.val || '';
            var label = '';
            if (bedVal) label += bedVal + '+ bd';
            if (bathVal) label += (label ? ', ' : '') + bathVal + '+ ba';
            document.getElementById('bey-bed-label').textContent = label || 'Beds & baths';
            document.getElementById('bey-bed-btn').classList.toggle('bey-pill--active', !!(bedVal || bathVal));
        });
    });

    /* Listing type radio */
    document.querySelectorAll('input[name="bey-type"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            var labels = { 'for-sale': 'For sale', 'for-rent': 'For rent', 'sold': 'Sold' };
            document.getElementById('bey-type-label').textContent = labels[radio.value] || 'For sale';
        });
    });

    /* Price selects */
    ['bey-min-price', 'bey-max-price'].forEach(function(id) {
        var sel = document.getElementById(id);
        if (!sel) return;
        sel.addEventListener('change', function() {
            var min = document.getElementById('bey-min-price');
            var max = document.getElementById('bey-max-price');
            var minTxt = min.options[min.selectedIndex].text;
            var maxTxt = max.options[max.selectedIndex].text;
            var hasFilter = min.value || max.value;
            var label = hasFilter ? (minTxt + ' – ' + maxTxt) : 'Price';
            document.getElementById('bey-price-label').textContent = label;
            document.getElementById('bey-price-btn').classList.toggle('bey-pill--active', !!hasFilter);
        });
    });
})();

// ── Mobile map / list toggle ────────────────────────────────────────
(function () {
    var toggleBtn   = document.getElementById('fs-mobile-map-toggle');
    var toggleLabel = document.getElementById('fs-mobile-map-label');
    var fsBody      = document.querySelector('.fs-body');

    if (!toggleBtn || !fsBody) { return; }

    var mapIcon  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>';
    var listIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';

    toggleBtn.addEventListener('click', function () {
        var isMapView = fsBody.classList.toggle('is-map-view');
        if (isMapView) {
            toggleLabel.textContent = 'List';
            toggleBtn.querySelector('svg').outerHTML; // swap icon
            toggleBtn.innerHTML = listIcon + '<span id="fs-mobile-map-label">List</span>';
            toggleBtn.setAttribute('aria-label', 'Show list');
            // Fire resize so Mapbox fills the pane
            window.setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 50);
        } else {
            toggleBtn.innerHTML = mapIcon + '<span id="fs-mobile-map-label">Map</span>';
            toggleBtn.setAttribute('aria-label', 'Show map');
        }
    });
})();
