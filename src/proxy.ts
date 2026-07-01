import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getControlPanelApi, fetchWithTimeout } from './lib/api';

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip asset folders, static files, favicon, API endpoints, and Next.js internally-resolved paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const CONTROL_PANEL_API = getControlPanelApi();

  try {
    // Fetch active redirects list from the SEO Control Panel API
    const res = await fetchWithTimeout(`${CONTROL_PANEL_API}/redirects?siteId=gotolatest`, {
      next: { revalidate: 300 } // Cache active redirects list for 5 minutes
    });

    if (res.ok) {
      const redirects = await res.json();
      // Search for a redirect rule matching the current request route
      const rule = redirects.find((r: any) => r.sourcePath === pathname);
      
      if (rule) {
        console.log(`[SEO Redirect] Routing path match found: Redirecting ${pathname} -> ${rule.destinationPath} (${rule.statusCode})`);
        return NextResponse.redirect(new URL(rule.destinationPath, request.url), rule.statusCode);
      }
    }
  } catch (err) {
    // Fail silently so the website remains responsive if the API database goes offline
    console.error('[SEO Redirects Middleware] Error matching request path:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
