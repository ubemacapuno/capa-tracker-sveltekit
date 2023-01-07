<script>
    //The page store is a store that is built into svelte
    import { page } from '$app/stores'
    //Let's disect the page object with a console log and make it reactive!
    $: console.log('page', $page)
</script>

<div class="card w-72 bg-neutral shadow-xl">
    <div class="card-body">
        <strong class="text-warning text-3xl">Oops!</strong>
        <h2 class="mt-5 text-error text-3xl">{$page.status} {$page.error?.message}!</h2>
        <a class="mt-5 btn btn-secondary"href="/">Home</a>
    </div>
</div>
