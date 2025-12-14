<script lang="ts">
	interface Props {
		current: number;
		total: number;
	}

	const { current, total }: Props = $props();

	const progress = $derived(Math.min(100, Math.max(0, (current / total) * 100)));
</script>

<div class="progress-text">
	{current} / {total}
</div>
<div class="progress-container">
	<div class="progress-fill" style="width: {progress}%"></div>
</div>
