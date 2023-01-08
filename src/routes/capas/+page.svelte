<script lang="ts">
    import type { PageData } from './$types';
      
    export let data: PageData;
    $: ({capaReports} = data)
  
</script>
    <h1>Total CAPAs: {capaReports.length}</h1>
    {#each capaReports as capa}
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
    {/each}