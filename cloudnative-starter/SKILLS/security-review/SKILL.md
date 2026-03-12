---
name: security-review
description: Use this skill when adding authentication, handling user input, working with secrets, creating API endpoints, or implementing payment/sensitive features. Provides comprehensive security checklist and patterns.
user-invocable: false
---

# Security Review Skill

This skill ensures all code follows security best practices and identifies potential vulnerabilities.

## When to Activate

- Implementing authentication or authorization
- Handling user input or file uploads
- Creating new API endpoints
- Working with secrets or credentials
- Implementing payment features
- Storing or transmitting sensitive data
- Integrating third-party APIs

## Security Checklist

### 1. Secrets Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"

// ALWAYS: Environment variables
const apiKey = process.env.API_KEY
if (!apiKey) { throw new Error('API_KEY not configured') }
```

Verification:
- [ ] No hardcoded API keys, tokens, or passwords
- [ ] All secrets in environment variables
- [ ] `.env.local` in .gitignore
- [ ] No secrets in git history

### 2. Input Validation

```typescript
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150)
})
```

### 3. SQL Injection Prevention

```typescript
// NEVER concatenate SQL
// ALWAYS use parameterized queries or ORM
const { data } = await supabase.from('users').select('*').eq('email', userEmail)
```

### 4. Authentication & Authorization

- Tokens stored in httpOnly cookies (not localStorage)
- Authorization checks before sensitive operations
- Row Level Security enabled in database
- Role-based access control implemented

### 5. XSS Prevention

```typescript
import DOMPurify from 'isomorphic-dompurify'
const clean = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
  ALLOWED_ATTR: []
})
```

### 6. CSRF Protection

- CSRF tokens on state-changing operations
- SameSite=Strict on all cookies

### 7. Rate Limiting

- Rate limiting on all API endpoints
- Stricter limits on expensive operations
- IP-based and user-based rate limiting

### 8. Sensitive Data Exposure

```typescript
// WRONG: Logging sensitive data
console.log('User login:', { email, password })

// CORRECT: Redact sensitive data
console.log('User login:', { email, userId })
```

### 9. Dependency Security

```bash
npm audit           # Check for vulnerabilities
npm audit fix       # Fix automatically fixable issues
npm outdated        # Check for outdated packages
```

## Pre-Deployment Security Checklist

- [ ] No hardcoded secrets, all in env vars
- [ ] All user inputs validated
- [ ] All queries parameterized
- [ ] User content sanitized
- [ ] CSRF protection enabled
- [ ] Proper token handling
- [ ] Role checks in place
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] No sensitive data in errors
- [ ] No sensitive data logged
- [ ] Dependencies up to date
- [ ] CORS properly configured

**Remember**: Security is not optional. One vulnerability can compromise the entire platform. When in doubt, err on the side of caution.
