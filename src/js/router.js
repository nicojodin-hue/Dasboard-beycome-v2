// Hash-based SPA router
const routeMap = {
    '/your-listing': 'properties',
    '/offers': 'offers',
    '/requested-show': 'visits',
    '/your-messages': 'messages',
    '/calendar': 'calendar',
    '/contract': 'contracts',
    '/profile': 'account',
    '/collection': 'collection',
    '/submit-property': 'addProperty'
};

const pageToRoute = {};
Object.entries(routeMap).forEach(([k, v]) => pageToRoute[v] = k);

let routing = false;
let pageModules = {};
let onPageChange = null;
export function initRouter(modules, callback) {
    pageModules = modules;
    onPageChange = callback;

    // Store current handleHash on window so listeners always call the latest version
    window.__handleHash = handleHash;

    if (!window.__routerInit) {
        window.__routerInit = true;

        document.addEventListener('click', function (e) {
            const a = e.target.closest('a');
            if (a) {
                const href = a.getAttribute('href');
                if (href && routeMap[href]) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.hash = href;
                }
            }
        }, true);

        window.addEventListener('hashchange', function () {
            if (window.__handleHash) window.__handleHash();
        });
    }

    // Handle initial hash
    if (window.location.hash) {
        const hashPath = window.location.hash.slice(1).split('?')[0];
        // Check for known routes or dynamic routes (offer detail, mls-form, submit-property, market-trends, title)
        if (routeMap[hashPath] || hashPath.match(/^\/offers\/.+$/) || hashPath.match(/^\/mls-form\/.+$/) || hashPath.match(/^\/submit-property(\/.*)?$/) || hashPath.match(/^\/market-trends(\/.*)?$/) || hashPath === '/title' || hashPath === '/investor-report' || hashPath === '/investor-report-q1' || hashPath === '/investor-reports') {
            handleHash();
        } else {
            window.location.hash = '/offers';
        }
    } else {
        window.location.hash = '/offers';
    }
}

function handleHash() {
    if (routing) { routing = false; return; }
    const hash = window.location.hash.slice(1);

    // Check if it's a submit-property route with ID (e.g., /submit-property/123)
    const submitPropertyMatch = hash.match(/^\/submit-property\/(.+)$/);
    const isSubmitPropertyRoute = hash === '/submit-property' || submitPropertyMatch;

    // Check if it's an offer detail route (e.g., /offers/offer_1)
    const offerDetailMatch = hash.match(/^\/offers\/(.+)$/);

    // Check if it's an MLS form route (e.g., /mls-form/prop_123)
    const mlsFormMatch = hash.match(/^\/mls-form\/(.+)$/);

    // Check if it's a market-trends route
    const marketTrendsSlugMatch = hash.match(/^\/market-trends\/(.+)$/);
    const isMarketTrendsRoute = hash === '/market-trends' || marketTrendsSlugMatch;

    // Check if it's a title route
    const isTitleRoute = hash === '/title';

    // Check if it's an investor-report route
    const isInvestorReportRoute = hash === '/investor-report' || hash === '/investor-report-q1' || hash === '/investor-reports';

    // Hide investor-report page when navigating away
    const irContainer = document.getElementById('investor-report-container');
    if (irContainer && !isInvestorReportRoute) {
        irContainer.innerHTML = '';
        irContainer.style.display = 'none';
        document.body.style.overflow = '';
        showDashboardLayout(true);
    }

    // Clean up investor-report state
    if (!isInvestorReportRoute && pageModules.investorReport && pageModules.investorReport.cleanup) {
        pageModules.investorReport.cleanup();
    }

    // Hide title page when navigating away
    const titleContainer = document.getElementById('title-container');
    if (titleContainer && !isTitleRoute) {
        titleContainer.innerHTML = '';
        titleContainer.style.display = 'none';
        document.body.style.overflow = '';
        showDashboardLayout(true);
    }

    // Clean up title state
    if (!isTitleRoute && pageModules.title && pageModules.title.cleanup) {
        pageModules.title.cleanup();
    }

    // Hide submit property page when navigating away
    const submitContainer = document.getElementById('submit-property-container');
    if (submitContainer) {
        submitContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Hide market trends page when navigating away
    const mtContainer = document.getElementById('market-trends-container');
    if (mtContainer && !isMarketTrendsRoute) {
        mtContainer.innerHTML = '';
        mtContainer.style.display = 'none';
        document.body.style.overflow = '';
        // Restore dashboard layout
        showDashboardLayout(true);
    }

    // Clean up market-trends state
    if (!isMarketTrendsRoute && pageModules.marketTrends && pageModules.marketTrends.cleanup) {
        pageModules.marketTrends.cleanup();
    }

    // Clean up offer-detail state (action bar moved to chat, resize listener)
    if (pageModules.offerDetail && pageModules.offerDetail.cleanup) {
        pageModules.offerDetail.cleanup();
    }

    // Handle title route — full-screen standalone page
    if (isTitleRoute) {
        const tCont = document.getElementById('title-container');
        if (tCont && pageModules.title) {
            showDashboardLayout(false);
            tCont.style.cssText = 'display:block; position:fixed; top:0; left:0; right:0; bottom:0; z-index:2000; background:var(--c-bg); overflow-y:auto;';
            tCont.innerHTML = pageModules.title.render();
            pageModules.title.init();
        }
        return;
    }

    // Handle investor-report routes — full-screen standalone pages
    if (isInvestorReportRoute) {
        const irCont = document.getElementById('investor-report-container');
        if (irCont) {
            showDashboardLayout(false);
            irCont.style.cssText = 'display:block; position:fixed; top:0; left:0; right:0; bottom:0; z-index:2000; background:var(--c-bg); overflow-y:auto;';

            if (hash === '/investor-report-q1' && pageModules.investorReportQ1) {
                irCont.innerHTML = pageModules.investorReportQ1.render();
                pageModules.investorReportQ1.init();
            } else if (hash === '/investor-reports' && pageModules.investorReports) {
                irCont.innerHTML = pageModules.investorReports.render();
                pageModules.investorReports.init();
            } else if (pageModules.investorReport) {
                irCont.innerHTML = pageModules.investorReport.render();
                pageModules.investorReport.init();
            }
        }
        return;
    }

    // Handle market trends route — full-screen standalone page
    if (isMarketTrendsRoute) {
        const slug = marketTrendsSlugMatch ? marketTrendsSlugMatch[1] : null;
        const mtCont = document.getElementById('market-trends-container');
        if (mtCont && pageModules.marketTrends) {
            // Hide dashboard layout
            showDashboardLayout(false);
            mtCont.style.cssText = 'display:block; position:fixed; top:0; left:0; right:0; bottom:0; z-index:2000; background:var(--c-bg); overflow-y:auto;';
            mtCont.innerHTML = pageModules.marketTrends.render(slug);
            pageModules.marketTrends.init(slug);
        }
        return;
    }

    // Handle offer detail route — render inside main layout like other pages
    if (offerDetailMatch) {
        // Hide MLS form if open
        const mlsContainer = document.getElementById('mls-form-container');
        if (mlsContainer) { mlsContainer.style.display = 'none'; document.body.style.overflow = ''; }

        const offerId = offerDetailMatch[1];
        if (pageModules.offerDetail) {
            const contentArea = document.getElementById('page-content');
            if (contentArea) {
                contentArea.innerHTML = pageModules.offerDetail.render(offerId);
                pageModules.offerDetail.init(offerId);
            }
        }
        updateActiveNav('/offers');
        updateMobileActiveNav('offers');
        return;
    }

    // Handle MLS form route
    if (mlsFormMatch) {
        const mlsContainer = document.getElementById('mls-form-container');
        if (mlsContainer && pageModules.mlsForm) {
            const propertyId = mlsFormMatch[1];
            mlsContainer.innerHTML = pageModules.mlsForm.render(propertyId);
            pageModules.mlsForm.init(propertyId);
            mlsContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        updateActiveNav('/your-listing');
        return;
    }

    // Hide MLS form when navigating away
    const mlsContainer = document.getElementById('mls-form-container');
    if (mlsContainer) {
        mlsContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (isSubmitPropertyRoute) {
        if (submitContainer) {
            // Re-render the submit property page
            if (pageModules.addProperty) {
                // Pass the property ID if editing
                const propertyId = submitPropertyMatch ? submitPropertyMatch[1] : null;
                submitContainer.innerHTML = pageModules.addProperty.render(propertyId);
                pageModules.addProperty.init(propertyId);
            }
            submitContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        updateActiveNav('/submit-property');
        return;
    }

    // Split hash to handle query parameters
    const hashPath = hash.split('?')[0];
    const page = routeMap[hashPath];

    if (page && onPageChange) {
        onPageChange(page, hashPath);
        updateActiveNav(hashPath);
        updateMobileActiveNav(page);
    }
}

export function navigateTo(page, e) {
    if (e) e.preventDefault();
    const route = pageToRoute[page];
    if (route) {
        routing = true;
        window.location.hash = route;
    }
    if (onPageChange) {
        onPageChange(page, route || '');
    }
    updateActiveNav(route || '');
    updateMobileActiveNav(page);
}

function updateActiveNav(route) {
    const r = route || window.location.hash.slice(1).split('?')[0];
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === r) l.classList.add('active');
    });
}

function updateMobileActiveNav(page) {
    const mobileMap = { 'properties': 0, 'offers': 1, 'visits': 2, 'messages': 3 };
    document.querySelectorAll('.mobile-bottom-nav-items > .mobile-bottom-nav-item, .mobile-bottom-nav-items > .mobile-more-wrapper .mobile-bottom-nav-item').forEach(i => i.classList.remove('active'));
    const idx = mobileMap[page];
    if (idx !== undefined) {
        const items = document.querySelectorAll('.mobile-bottom-nav-items > .mobile-bottom-nav-item');
        if (items[idx]) items[idx].classList.add('active');
    }
}

function showDashboardLayout(show) {
    const els = [
        document.getElementById('main-header'),
        document.getElementById('top-nav'),
        document.querySelector('.main-layout'),
        document.getElementById('mobile-bottom-nav-container')
    ];
    els.forEach(el => {
        if (el) el.style.display = show ? '' : 'none';
    });
}

export { routeMap, pageToRoute };
