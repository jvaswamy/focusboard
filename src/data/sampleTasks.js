function dateOffset(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export const sampleTasks = [
  {
    id: 'task-01',
    title: 'Finalize the new landing page',
    description: 'Polish the hero section and get the final responsive checks in.',
    status: 'In progress',
    priority: 'High',
    dueDate: dateOffset(0),
    category: 'Design',
  },
  {
    id: 'task-02',
    title: 'Review Q4 campaign concepts',
    description: 'Leave feedback on the three campaign directions from the team.',
    status: 'To do',
    priority: 'High',
    dueDate: dateOffset(1),
    category: 'Marketing',
  },
  {
    id: 'task-03',
    title: 'Send the project update',
    description: 'Share this week’s milestones and next steps with everyone.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: dateOffset(0),
    category: 'Admin',
  },
  {
    id: 'task-04',
    title: 'Explore onboarding improvements',
    description: 'Look for small ways to make the first-run experience feel easier.',
    status: 'To do',
    priority: 'Low',
    dueDate: dateOffset(4),
    category: 'Product',
  },
  {
    id: 'task-05',
    title: 'Prepare notes for the team sync',
    description: 'Add your talking points and questions before the weekly sync.',
    status: 'In progress',
    priority: 'Medium',
    dueDate: dateOffset(2),
    category: 'Planning',
  },
  {
    id: 'task-06',
    title: 'Organize the shared workspace',
    description: 'Archive old drafts and make sure the latest files are easy to find.',
    status: 'To do',
    priority: 'Low',
    dueDate: dateOffset(6),
    category: 'Admin',
  },
  {
    id: 'task-07',
    title: 'Share the updated brand kit',
    description: 'Send the latest logo exports and color tokens to the team.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: dateOffset(-1),
    category: 'Design',
  },
]
