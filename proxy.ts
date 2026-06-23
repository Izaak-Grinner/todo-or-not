import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request })
    const pathname = request.nextUrl.pathname
    const isAuthRoute = pathname === '/login' || pathname === '/signup'

    const supabase = await createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, // 💡 教材のPUBLISHABLE_KEYをあなたの.envに合わせました
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet, headers) => {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
                    Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user && !isAuthRoute) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/login'
        loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (user && isAuthRoute) {
        const homeUrl = request.nextUrl.clone()
        homeUrl.pathname = '/'
        homeUrl.search = ''
        return NextResponse.redirect(homeUrl)
    }

    return response
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}