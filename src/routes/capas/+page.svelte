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
          <p class="text-secondary">{capa.capaStatus}</p>
          <p>{capa.capaPhase} Phase</p>
          <p>{capa.problemStatement}</p>
          <p>Date Created: {capa.dateCapaCreated.slice(0,10)}</p>
          <!-- <p>Date Approved: {capa.dateCapaApproved.slice(0,10)}</p> -->
          <p>Phase Due Date: {capa.currentPhaseDueDate.slice(0,10)}</p>
          <div class="card-actions btn-group">
            <a href="#" class="btn btn-primary">View</a>
            <a href="#" class="btn btn-secondary">Delete</a>
          </div>
        </div>
      </div>
    {/each}