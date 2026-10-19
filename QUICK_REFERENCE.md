# Code Improvements - Quick Reference

## Common Patterns

### 1. Form Validation with New Validation Library

```typescript
import { Validators, ErrorMessages } from '@/lib';

// In your component
const validateForm = (formData: FormData) => {
  const errors: Record<string, string> = {};

  // Required field
  if (!formData.title.trim()) {
    errors.title = ErrorMessages.REQUIRED;
  }

  // Email validation
  if (formData.email && !Validators.email(formData.email)) {
    errors.email = ErrorMessages.INVALID_EMAIL;
  }

  // Number range
  if (formData.age < 18 || formData.age > 100) {
    errors.age = "Must be between 18 and 100";
  }

  return errors;
};
```

### 2. CRUD Operations with Error Handling

```typescript
import { useCrudResource } from '@/hooks/useCrudResource';
import { useToast } from '@/components/ui/Toast';

const { deleteItem, deleteItemWithLoading, isLoading, error } = useCrudResource(data);
const { addToast } = useToast();

const handleDelete = (id: string) => {
  deleteItem(id, {
    onSuccess: () => addToast({ type: 'success', title: 'Deleted successfully' }),
    onError: (err) => addToast({ type: 'error', title: 'Delete failed', message: err.message }),
  });
};

// Async variant with simulated network + loading state
const handleDeleteAsync = async (id: string) => {
  try {
    await deleteItemWithLoading(id, {
      onSuccess: () => addToast({ type: 'success', title: 'Deleted successfully' }),
      onError: (err) => addToast({ type: 'error', title: 'Delete failed', message: err.message }),
    });
  } catch (err) {
    // Error is handled in callbacks
  }
};
```

### 3. Using Toast Notifications

```typescript
const { addToast } = useToast();

// Success message
addToast({ type: 'success', title: 'Operation successful', message: 'Your data has been saved' });

// Error message
addToast({ type: 'error', title: 'Upload failed', message: 'Could not upload your file. Please try again.' });

// Warning message
addToast({ type: 'warning', title: 'Unsaved changes', message: 'You have unsaved changes that will be lost.' });

// Info message
addToast({ type: 'info', title: 'Server updated', message: 'The server has been successfully updated.' });
```

### 4. Using Validation Helpers

```typescript
import {
  generateUniqueId,
  formatDate,
  truncate,
  parseCommaSeparated,
  sanitizeString
} from '@/lib';

// Generate unique ID
const id = generateUniqueId(); // e.g., "1234567890-abc123def"

// Format date
const formattedDate = formatDate('2024-01-15', 'long'); // "January 15, 2024"

// Truncate text
const shortText = truncate(longText, 50); // "This is a very long text..."

// Parse comma-separated values
const techs = parseCommaSeparated('React, TypeScript, Node.js'); // ["React", "TypeScript", "Node.js"]

// Sanitize input
const safeInput = sanitizeString(userInput); // Removes dangerous characters
```

### 5. Date Utilities

```typescript
import { getDaysDiff, isPastDate, isFutureDate } from '@/lib';

// Calculate days difference
const diff = getDaysDiff(new Date('2024-01-01'), new Date('2024-01-15')); // 14

// Check if date is in the past
const past = isPastDate(new Date('2020-01-01')); // true

// Check if date is in the future
const future = isFutureDate(new Date('2030-01-01')); // true
```

### 6. Using Confirmation Dialog

```typescript
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { useState } from 'react';

const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const [deletingId, setDeletingId] = useState<string | null>(null);

const handleDeleteClick = (id: string, name: string) => {
  setDeletingId(id);
  setIsDeleteDialogOpen(true);
};

const handleDeleteConfirm = async () => {
  if (deletingId) {
    await deleteItem(deletingId);
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  }
};

<ConfirmationDialog
  isOpen={isDeleteDialogOpen}
  onClose={() => setIsDeleteDialogOpen(false)}
  onConfirm={handleDeleteConfirm}
  message="Are you sure you want to delete this item? This action cannot be undone."
  danger={true}
/>
```

## Common Errors and Solutions

### Error: "Cannot find module '@/lib'"
**Solution**: Ensure you have `@/*` path mapping in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Error: "useCrudResource is not exported"
**Solution**: Import from the correct location:
```typescript
import { useCrudResource } from '@/hooks/useCrudResource';
```

### Error: "validation.ts is not exported"
**Solution**: Import from the new location:
```typescript
import { Validators, ErrorMessages } from '@/lib/validation';
```

### Error: "useToast must be used within a ToastProvider"
**Solution**: Ensure the `ToastProvider` wraps your component tree (it is mounted in the root layout):
```typescript
import { useToast } from "@/components/ui/Toast";

const { addToast } = useToast();
addToast({ type: "success", title: "Saved" });
```

## Performance Tips

### 1. Debounce Input Changes
```typescript
import { debounce } from '@/lib';

const handleChange = debounce((value: string) => {
  // Do expensive operations
}, 300);
```

### 2. Optimize List Rendering
```typescript
// Use unique keys
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering
});
```

### 3. Cancel Incomplete Operations
```typescript
const [abortController, setAbortController] = useState<AbortController | null>(null);

const fetchData = async () => {
  const controller = new AbortController();
  setAbortController(controller);

  try {
    const response = await fetch('/api/data', {
      signal: controller.signal,
    });
    // Handle response
  } catch (err) {
    if (err.name === 'AbortError') {
      // Handle abort
    }
  }
};

// Cleanup
useEffect(() => {
  return () => {
    if (abortController) {
      abortController.abort();
    }
  };
}, []);
```

## Best Practices

### 1. Always Handle Errors
```typescript
try {
  await deleteItemWithLoading(id, {
    onSuccess: () => { /* handle success */ },
    onError: (error) => { /* handle error */ },
  });
} catch (err) {
  // Error is handled in callbacks
}
```

### 2. Use Proper Loading States
```typescript
const { isLoading } = useCrudResource(data);

return (
  <button disabled={isLoading} onClick={handleAction}>
    {isLoading ? 'Loading...' : 'Save'}
  </button>
);
```

### 3. Provide Clear Error Messages
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    // Show user-friendly errors
    showToast({
      type: 'error',
      title: 'Validation Failed',
      message: 'Please fix the errors and try again.',
    });
    return;
  }

  // Submit form
};
```

### 4. Clean Up Resources
```typescript
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### 5. Use Type Guards
```typescript
const isValidProject = (data: any): data is Project => {
  return (
    typeof data === 'object' &&
    typeof data.id === 'string' &&
    typeof data.title === 'string'
  );
};
```

## Migration Checklist

- [ ] Import validation functions from `@/lib/validation`
- [ ] Use `useCrudResource` with typed callbacks for CRUD operations
- [ ] Use `useToast` (from `@/components/ui/Toast`) for notifications
- [ ] Add confirmation dialogs for delete operations
- [ ] Implement proper error handling throughout
- [ ] Add input validation to all forms
- [ ] Use utility functions from `@/lib` for common operations
- [ ] Test all error scenarios
- [ ] Add loading states to all async operations

## Debugging Tips

### Enable Detailed Error Messages
```typescript
const { error } = useCrudResource(data, {
  onError: (err) => console.error('API Error:', err),
});

if (error) {
  console.error('API Error:', error);
}
```

### Debug Validation
```typescript
const validateField = (field: string, value: any) => {
  const error = Validators[field]?.(value);
  console.log(`Field: ${field}, Value: ${value}, Error: ${error}`);
  return error;
};
```

### Debug Form Data
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Form Data:', formData);
  console.log('Validation Errors:', errors);
  console.log('Touched Fields:', touched);
};
```

## Performance Monitoring

```typescript
// Measure operation time
const startTime = performance.now();
await deleteItemWithLoading(id);
const endTime = performance.now();
console.log(`Operation took ${endTime - startTime}ms`);

// Monitor memory usage
if (process.env.NODE_ENV === 'development') {
  if (performance.memory) {
    console.log('Memory used:', performance.memory.usedJSHeapSize);
  }
}
```
