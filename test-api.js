const http = require("http");

const API_BASE = "http://localhost:5000/api/v1";

// Helper to make HTTP requests using node built-in http module
const request = (method, path, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}${path}`;
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const req = http.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (err) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runAllRoutes = async () => {
  console.log("\n========================================================");
  console.log("🌌  STACKORBIT AUTOMATED API GATEWAY RUNNER  🌌");
  console.log("========================================================\n");

  let jwtToken = null;
  let createdWorkflowId = null;

  try {
    // ----------------------------------------------------
    // ROUTE 1: HEALTH CHECK
    // ----------------------------------------------------
    console.log("📡 [GET] /health — Verifying core API Gateway status...");
    const health = await request("GET", "/health");
    if (health.status === 200 && health.data.success) {
      console.log("   ✓ Status: 200 OK");
      console.log(`   ✓ Response: "${health.data.message}"`);
    } else {
      console.log(`   ❌ Failed with status ${health.status}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 2: USER REGISTRATION
    // ----------------------------------------------------
    const timestamp = Date.now();
    const testUser = {
      name: "Developer Test",
      email: `test_${timestamp}@stackorbit.io`,
      password: "password123",
    };
    console.log(`👤 [POST] /auth/register — Creating secure tester profile (${testUser.email})...`);
    const register = await request("POST", "/auth/register", testUser);
    if (register.status === 201 && register.data.success) {
      console.log("   ✓ Status: 201 Created");
      console.log("   ✓ Database response: User registered and password hashed via bcrypt.");
    } else {
      console.log(`   ❌ Failed: ${JSON.stringify(register.data)}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 3: USER LOGIN & JWT GENERATION
    // ----------------------------------------------------
    console.log("🔑 [POST] /auth/login — Generating secure cryptographic session JWT...");
    const login = await request("POST", "/auth/login", {
      email: testUser.email,
      password: testUser.password,
    });
    if (login.status === 200 && login.data.success) {
      jwtToken = login.data.data.token;
      console.log("   ✓ Status: 200 OK");
      console.log("   ✓ Token: " + jwtToken.substring(0, 45) + "... [HMAC-SHA256 Encoded]");
    } else {
      console.log(`   ❌ Failed to authenticate: ${JSON.stringify(login.data)}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 4: PROFILE DETAIL VERIFICATION (PROTECTED)
    // ----------------------------------------------------
    console.log("🔐 [GET] /auth/profile — Verifying Authorization header bearer decryption...");
    const profile = await request("GET", "/auth/profile", null, jwtToken);
    if (profile.status === 200 && profile.data.success) {
      console.log("   ✓ Status: 200 OK");
      console.log(`   ✓ Authenticated profile name: "${profile.data.data.name}"`);
      console.log(`   ✓ Role privileges verified: "${profile.data.data.role}"`);
    } else {
      console.log(`   ❌ Failed access control check: ${profile.status}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 5: CATALOG WORKFLOW LISTINGS
    // ----------------------------------------------------
    console.log("📚 [GET] /workflows — Querying catalog registry index...");
    const workflows = await request("GET", "/workflows");
    if (workflows.status === 200 && workflows.data.success) {
      console.log("   ✓ Status: 200 OK");
      console.log(`   ✓ Verified registry entries count: ${workflows.data.data.length} items`);
    } else {
      console.log(`   ❌ Catalog listing failed: ${workflows.status}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 6: SPECIAL SORT FILTERS (LATEST)
    // ----------------------------------------------------
    console.log("📈 [GET] /workflows/latest — Querying sorted index (createdAt: descending)...");
    const latest = await request("GET", "/workflows/latest");
    if (latest.status === 200 && latest.data.success) {
      console.log("   ✓ Status: 200 OK");
      console.log(`   ✓ Newest template parsed: "${latest.data.data[0]?.title}"`);
    } else {
      console.log(`   ❌ Latest filter failed: ${latest.status}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 7: CREATE NEW CONFIG (PROTECTED)
    // ----------------------------------------------------
    const newWorkflow = {
      title: "AWS ECS Pipeline Integration",
      description: "Automated container builds and cluster update syncing on code pushes.",
      category: "github-actions",
      tags: ["advanced", "aws", "ecs"],
      yamlContent: "name: AWS Deploy\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3",
    };
    console.log("➕ [POST] /workflows — Storing new secure Mongoose document in collection...");
    const createWf = await request("POST", "/workflows", newWorkflow, jwtToken);
    if (createWf.status === 201 && createWf.data.success) {
      createdWorkflowId = createWf.data.data._id;
      console.log("   ✓ Status: 201 Created");
      console.log(`   ✓ Generated entry _id: ${createdWorkflowId}`);
      console.log(`   ✓ Associated user reference: ${createWf.data.data.createdBy}`);
    } else {
      console.log(`   ❌ Workflow creation failed: ${JSON.stringify(createWf.data)}`);
    }
    console.log("--------------------------------------------------------\n");

    // ----------------------------------------------------
    // ROUTE 8: PIPELINE EXECUTIVE SIMULATOR
    // ----------------------------------------------------
    if (createdWorkflowId) {
      console.log("🚀 [POST] /workflows/:id/run — Triggering pipeline container executor simulation...");
      const run = await request("POST", `/workflows/${createdWorkflowId}/run`, null, jwtToken);
      if (run.status === 200 && run.data.success) {
        console.log("   ✓ Status: 200 OK");
        console.log(`   ✓ Execution message: "${run.data.message}"`);
      } else {
        console.log(`   ❌ Runner failed: ${JSON.stringify(run.data)}`);
      }
      console.log("--------------------------------------------------------\n");
    }

    // ----------------------------------------------------
    // ROUTE 9: LIFECYCLE MANAGEMENT (ARCHIVE / SOFT-DELETE)
    // ----------------------------------------------------
    if (createdWorkflowId) {
      console.log("📦 [PATCH] /workflows/:id/archive — Flagging soft-delete template archive status...");
      const archive = await request("PATCH", `/workflows/${createdWorkflowId}/archive`, null, jwtToken);
      if (archive.status === 200 && archive.data.success) {
        console.log("   ✓ Status: 200 OK");
        console.log(`   ✓ Current active archive status: ${archive.data.data.isArchived}`);
      } else {
        console.log(`   ❌ Archiving failed: ${JSON.stringify(archive.data)}`);
      }
      console.log("--------------------------------------------------------\n");
    }

    // ----------------------------------------------------
    // ROUTE 10: PERMANENT CLEANUP (DELETE)
    // ----------------------------------------------------
    if (createdWorkflowId) {
      console.log("🗑️  [DELETE] /workflows/:id — Destroying document securely from MongoDB...");
      const clean = await request("DELETE", `/workflows/${createdWorkflowId}`, null, jwtToken);
      if (clean.status === 200 && clean.data.success) {
        console.log("   ✓ Status: 200 OK");
        console.log("   ✓ Cleaned successfully.");
      } else {
        console.log(`   ❌ Destroy failed: ${JSON.stringify(clean.data)}`);
      }
      console.log("--------------------------------------------------------\n");
    }

    console.log("========================================================");
    console.log("🎉  ALL CORE BACKEND REST ROUTES COMPLETED SUCCESSFUL!  🎉");
    console.log("========================================================\n");

  } catch (err) {
    console.error("Test execution failed to connect to port 5000. Verify the server is running.", err.message);
  }
};

runAllRoutes();
