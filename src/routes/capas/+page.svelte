<script lang="ts">
    import type { PageData } from './$types';
    
	export let data: PageData;
    export let capas: any[]
  </script>
  <h1>See CAPAs</h1>
  <ul>
    {#each capas as capa}
      <li>
        <h3>{capa.capaNumber}</h3>
        <p>{capa.capaStatus}</p>
      </li>
    {/each}
  </ul>