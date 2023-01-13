<script lang="ts">
  import { enhance } from '$app/forms'
	import { form_action } from '$lib/forms/enhance'
	import type { PageData } from './$types'
      
  export let data: PageData;
  $: ({capas} = data)
  
  let capaNumber = ''
  let dateCapaCreated = ''
  let capaStatus = ''
  let capaPhase = ''
  let problemStatement = ''
  let dateCapaApproved = ''
  let currentPhaseDueDate = ''
  let productImpacted = ''
  
</script>
    <h1>Total CAPAs: {capas.length}</h1>
    <!-- {#each capaReports as capa}
      <div class="my-4 card w-80 bg-neutral text-primary-content self-center">
        <div class="card-body">
          <h2 class="card-title text-accent">{capa.capaNumber}</h2>
          {#if capa.capaStatus === "Approved"}
            <p class="text-accent">{capa.capaStatus}</p>
          {:else if capa.capaStatus === "Pending"}
            <p class="text-warning">{capa.capaStatus}</p>
          {:else}
            <p class="text-error">{capa.capaStatus}</p>
          {/if}
          <p class="text-neutral-content">{capa.capaPhase} Phase</p>
          <p class="text-neutral-content">{capa.problemStatement}</p>
          <p class="text-neutral-content">Date Created: {capa.dateCapaCreated.slice(0,10)}</p>
          <p class="text-neutral-content">Date Approved: {capa.dateCapaApproved.slice(0,10)}</p>
          <p class="text-neutral-content">Phase Due Date: {capa.currentPhaseDueDate.slice(0,10)}</p>
          <div class="card-actions btn-group">
            <button disabled class="btn btn-primary">View</button>
            <button disabled class="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>
    {/each} -->

    <div class="my-4 card w-96 bg-neutral text-primary-content self-center">
      <div class="card-body">
        <h3 class="card-title text-accent">Capas</h3>
      </div>
      <form method="POST" action="?/create" use:enhance={form_action({ message: 'Capa creation' })}>
        <input type="text" name="capaNumber" placeholder="CAPA Number" bind:value={capaNumber} />
        <label for="dateCapaCreated">Date Created</label>
        <input type="date" name="dateCapaCreated" placeholder="Date Created" bind:value={dateCapaCreated} />
        <input type="text" name="capaStatus" placeholder="CAPA Status" bind:value={capaStatus} />
        <input type="text" name="capaPhase" placeholder="CAPA Phase" bind:value={capaPhase} />
        <input type="textarea" name="problemStatement" placeholder="problemStatement" bind:value={problemStatement} />
        <input type="date" name="dateCapaApproved" bind:value={dateCapaApproved} />
        <input type="date" name="currentPhaseDueDate" bind:value={currentPhaseDueDate} />
        <input type="text" name="productImpacted" placeholder="Product impacted" bind:value={productImpacted} />



        <button type="submit">Create Company</button>
      </form>
    </div>  
{#each capas as capa}
  <div class="my-4 card w-96 bg-neutral text-primary-content self-center">
    <div class="card-body">

      <h3 class="card-title text-accent">{capa.capaNumber}</h3>
      <form method="POST" action="?/update" use:enhance={form_action({ message: 'Company update' })}>
        <input type="hidden" name={'_id'} value={capa._id} />
        <input type="text" name="name" class="my-2 input w-full max-w-xs" value={capa.capaNumber} />
        <input type="text" name="capaStatus" class="my-2 input w-full max-w-xs" value={capa.capaStatus} />
        <input type="text" name="capaPhase" class="my-2 input w-full max-w-xs" value={capa.capaPhase} />
        <input type="text" name="problemStatement" class="my-2 input w-full max-w-xs" value={capa.problemStatement} />
        <input type="text" name="dateCapaCreated" class="my-2 input w-full max-w-xs" value={capa.dateCapaCreated} />
        <input type="text" name="dateCapaApproved" class="my-2 input w-full max-w-xs" value={capa.dateCapaApproved} />
        <input type="text" name="currentPhaseDueDate" class="my-2 input w-full max-w-xs" value={capa.currentPhaseDueDate} />
        <input type="text" name="productImpacted" class="my-2 input w-full max-w-xs" value={capa.productImpacted} />
        <button class="btn btn-primary" type="submit">Update</button>
      </form>

      <form
        method="POST"
        action="?/delete"
        use:enhance={form_action({ message: 'Capa deletion' })}
      >
        <button class="btn btn-error" type="submit">Delete</button>
      </form>
    </div>
	</div>
{:else}
	<p>No Capas Found</p>
{/each}