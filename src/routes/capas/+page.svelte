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

    <div class="my-4 card w-96 bg-neutral text-primary-content self-center">
      <div class="card-body">
        <h3 class="card-title text-accent">Capas</h3>
      </div>
      <form
					method="POST"
					action="?/create"
					use:enhance
				>
					<input type="text" name="capaNumber" placeholder="CAPA Number" />
					<input type="date" name="dateCapaCreated" placeholder="email" />
          <input type="text" name="capaStatus" placeholder="CAPA Status"/>
          <input type="text" name="capaPhase" placeholder="CAPA Phase"/>
          <input type="textarea" name="problemStatement" placeholder="problemStatement"/>
          <input type="date" name="dateCapaApproved"/>
          <input type="date" name="currentPhaseDueDate" />
          <input type="text" name="productImpacted" placeholder="Product impacted"/>
					<button class="btn btn-primary" type="submit">Submit</button>
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