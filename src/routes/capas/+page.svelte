<script lang="ts">
  import { enhance } from '$app/forms'
	import { form_action } from '$lib/forms/enhance'
	import type { PageData } from './$types'
  import Modal from "$lib/components/Modal.svelte";

  //Variable declaration for the current company
	//Used to bring up the respective "company" in the edit modal.
      
  export let data: PageData;
  $: ({capas} = data)
  let isModalOpen: 'add-capa-modal' | null | false = null
  let currentCapa = { 
    _id: '',
    capaNumber: '', 
    dateCapaCreated: '',
    capaStatus: '',
    capaPhase: '',
    problemStatement: '',
    dateCapaApproved: '',
    currentPhaseDueDate: '',
    productImpacted: '',
  }

  //Function for resetting form input after submission
	const clearFormInput = async (event) => {
		event.target.reset()
	}
</script>
    <h1 class="text-3xl font-bold">Total CAPAs: <span class="text-accent">{capas.length}</span></h1>

    <div class="my-4 card w-80 bg-neutral text-primary-content self-center">
      <div class="card-body p-3">
        <h3 class="card-title text-accent">Capas</h3>
        <form
            method="POST"
            action="?/create"
            use:enhance
            class="flex flex-col align-center gap-1 p-2"
            on:submit|preventDefault={(e) => (isModalOpen = null, clearFormInput(e))}
          >
          <div>
            <label for="capaNumber" class="label p-1">
              <span class="label-text">CAPA Number</span>
            </label>
            <input type="text" name="capaNumber" class="mb-4 input w-full max-w-s" />
          </div>
  
          <label for="dateCapaCreated" class="label p-1">
            <span class="label-text">Date Created</span>
          </label>
          <input type="date" name="dateCapaCreated" class="mb-4 input w-full max-w-s" />

          <label for="capaStatus" class="label p-1">
            <span class="label-text">Status</span>
          </label>
          <input type="text" name="capaStatus" class="mb-4 input w-full max-w-s"/>

          <label for="capaPhase" class="label p-1">
            <span class="label-text">Phase</span>
          </label>
          <input type="text" name="capaPhase"class="mb-4 input w-full max-w-s"/>

          <label for="problemStatement" class="label p-1">
            <span class="label-text">Problem Statement</span>
          </label>
          <textarea rows="3" name="problemStatement" class="textarea textarea-bordered mb-4"></textarea>

          <label for="dateCapaApproved" class="label p-1">
            <span class="label-text">Date Approved</span>
          </label>
          <input type="date" name="dateCapaApproved" class="mb-4 input w-full max-w-s"/>

          <label for="currentPhaseDueDate" class="label p-1">
            <span class="label-text">Phase Due Date</span>
          </label>
          <input type="date" name="currentPhaseDueDate" class="mb-4 input w-full max-w-s" />

          <label for="productImpacted" class="label p-1">
            <span class="label-text">Product Impacted</span>
          </label>
          <input type="text" name="productImpacted" class="mb-4 input w-full max-w-s"/>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>

    </div>  
{#each capas as capa}
  <div class="my-4 card w-80 bg-neutral text-primary-content self-center">
    <div class="card-body p-3">

      <h3 class="card-title text-accent">{capa.capaNumber}</h3>
      {#if capa.capaStatus !== "Closed"}
        <p>Status: {capa.capaStatus}</p>
        <p>Phase Due Date: {capa.currentPhaseDueDate}</p>
      {:else}
        <p class="text-primary">{capa.capaStatus}</p>
      {/if}

      <div class="btn-group flex justify-center">
        <button
                  on:click={() => ((isModalOpen = 'add-capa-modal'), (currentCapa = capa))}
                  type="button" class="btn btn-primary">Edit</button
                >
        <form
          method="POST"
          action="?/delete"
          use:enhance
        >
          <input type="hidden" name="_id" value={capa._id} />
          <button class="btn btn-error" type="submit">Delete</button>
        </form>
      </div>
    </div>
	</div>
{:else}
	<p>No Capas Found</p>
{/each}
{#if isModalOpen === 'add-capa-modal'}
  <Modal bind:isModalOpen>
    <form on:submit|preventDefault={(e) => (isModalOpen = null, clearFormInput(e))} class="flex flex-col" method="POST" action="?/update" use:enhance>
      <div class="flex flex-row mb-1 justify-between">
        <label for="capaNumber" class="label p-1">
          <span class="label-text">Number</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="text" name="name" class="input w-full max-w-xs" value={currentCapa.capaNumber.trim()} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="capaStatus" class="label p-1">
          <span class="label-text">Status</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="text" name="capaStatus" class="input w-full max-w-xs"  value={currentCapa.capaStatus.trim()} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="capaPhase" class="label p-1">
          <span class="label-text">Phase</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="text" name="capaPhase" class="input w-full max-w-xs"  value={currentCapa.capaPhase.trim()} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="dateCapaCreated" class="label p-1">
          <span class="label-text">Created</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="date" name="dateCapaCreated" class="input w-full max-w-xs"  value={currentCapa.dateCapaCreated} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="dateCapaCreated" class="label p-1">
          <span class="label-text">Approved</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="date" name="dateCapaApproved" class="input w-full max-w-xs"  value={currentCapa.dateCapaApproved} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="currentPhaseDueDate" class="label p-1">
          <span class="label-text">Due</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="date" name="currentPhaseDueDate" class="input w-full max-w-xs"  value={currentCapa.currentPhaseDueDate} />
      </div>

      <div class="flex flex-row mb-1 justify-between">
        <label for="productImpacted" class="label p-1">
          <span class="label-text">Product</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <input type="text" name="productImpacted" class="input w-full max-w-xs"  value={currentCapa.productImpacted.trim()} />
      </div>

      <div class="flex flex-col mb-1">
        <label for="capaStatus" class="label p-1">
          <span class="label-text">Problem Statement</span>
        </label>
        <input type="hidden" name={'_id'} value={currentCapa._id} />
        <textarea name="problemStatement" class="input w-full"  value={currentCapa.problemStatement.trim()} />
      </div>

      <button class="btn btn-primary" type="submit">Update</button>
    </form>
  </Modal>
{/if}