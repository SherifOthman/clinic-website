# Validation & Error Handling Guide

## ✅ Setup Complete

Your project now has:

- ✅ **Zod 3.23.8** with `zod-i18n-map` for automatic error translation
- ✅ **Built-in Arabic & English** translations for Zod errors
- ✅ **Automatic locale syncing** with next-intl
- ✅ **Server error handling** utilities

---

## 📝 How to Use

### 1. Zod Validation Errors (Automatic Translation)

Your forms already work! Zod errors are automatically translated based on the current locale.

```typescript
// src/features/auth/LoginForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const { register, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

// Errors are automatically translated!
<Input
  {...register("email")}
  errorMessage={errors.email?.message} // Already in Arabic or English!
/>
```

**No extra code needed!** The `ZodLocaleSyncer` component in your layout handles everything.

---

### 2. Server/API Errors (Custom Errors)

When your backend returns errors, use the server error utilities:

#### Example 1: Display General Server Error

```typescript
import { getServerErrorKey } from "@/src/lib";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const t = useTranslations();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data) => {
    try {
      const result = await loginAction(data);

      if (!result.success) {
        // Get translation key for the error
        const errorKey = getServerErrorKey(result.error);
        setApiError(t(errorKey));
      }
    } catch (error) {
      // Handle network errors
      const errorKey = getServerErrorKey(error);
      setApiError(t(errorKey));
    }
  };

  return (
    <form>
      {apiError && <div className="text-danger">{apiError}</div>}
      {/* form fields */}
    </form>
  );
};
```

#### Example 2: Display Field-Specific Server Errors

```typescript
import { extractFieldErrors } from "@/src/lib";

const onSubmit = async (data) => {
  try {
    const result = await signupAction(data);

    if (!result.success && result.error) {
      // Extract field-specific errors
      const fieldErrors = extractFieldErrors(result.error);

      // Set errors on specific fields
      Object.entries(fieldErrors).forEach(([field, errorKey]) => {
        setError(field, {
          type: "server",
          message: t(errorKey),
        });
      });
    }
  } catch (error) {
    // Handle error
  }
};
```

---

## 🌍 Translation Files

### Add Server Error Translations

Add these to your `src/messages/en.json` and `src/messages/ar.json`:

```json
{
  "errors": {
    "auth": {
      "invalidCredentials": "Invalid email or password",
      "emailAlreadyExists": "Email already exists",
      "weakPassword": "Password is too weak",
      "accountLocked": "Account is locked",
      "emailNotVerified": "Please verify your email"
    },
    "validation": {
      "invalidEmail": "Invalid email format",
      "invalidPhone": "Invalid phone number"
    },
    "generic": {
      "serverError": "Server error. Please try again",
      "networkError": "Network error. Check your connection",
      "unauthorized": "Unauthorized. Please login",
      "forbidden": "You don't have permission",
      "notFound": "Resource not found"
    }
  }
}
```

---

## 🔧 Backend API Response Format

Your backend should return errors in this format:

### General Error:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid credentials"
  }
}
```

### Field-Specific Errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "errors": [
      {
        "field": "email",
        "code": "EMAIL_ALREADY_EXISTS"
      },
      {
        "field": "password",
        "code": "WEAK_PASSWORD"
      }
    ]
  }
}
```

---

## 📚 Available Error Codes

See `src/lib/serverErrors.ts` for all available error codes:

- `INVALID_CREDENTIALS`
- `EMAIL_ALREADY_EXISTS`
- `WEAK_PASSWORD`
- `ACCOUNT_LOCKED`
- `EMAIL_NOT_VERIFIED`
- `INVALID_EMAIL`
- `INVALID_PHONE`
- `SERVER_ERROR`
- `NETWORK_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`

Add more codes as needed!

---

## 🎯 Summary

1. **Zod validation errors**: Automatic translation ✅
2. **Server errors**: Use `getServerErrorKey()` + `t()` ✅
3. **Field errors**: Use `extractFieldErrors()` ✅
4. **Network errors**: Use `isNetworkError()` ✅

Everything is set up and ready to use! 🚀
